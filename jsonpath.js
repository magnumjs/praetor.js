/* JSONPath 0.8.5 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 *
 * Proposal of Chris Zyp goes into version 0.9.x
 * Issue 7 resolved
 *
 * Modified by Michael Glazer for Praetor.js (https://github.com/magnumjs/praetor.js)
 * 3/9/2015
 * Added function instead of eval
 * Added function caching for performance
 *
 * TODO: more caching for regexes
 * TODO: pluggable interface for  different filters/expression/syntax etc...
 */
function jsonPath1(obj, expr, arg, cache) {

    var P = {
        resultType: arg && arg.resultType || "VALUE",
        result: [],
        normalize: function (expr) {
            var subx = [];
            return expr.replace(/[\['](\??\(.*?\))[\]']|\['(.*?)'\]/g, function ($0, $1, $2) {
                return "[#" + (subx.push($1 || $2) - 1) + "]";
            })/* http://code.google.com/p/jsonpath/issues/detail?id=4 */
                .replace(/'?\.'?|\['?/g, ";")
                .replace(/;;;|;;/g, ";..;")
                .replace(/;$|'?\]|'$/g, "")
                .replace(/#([0-9]+)/g, function ($0, $1) {
                             return subx[$1];
                         });
        },
        asPath: function (path) {
            var x = path.split(";"), p = "$";
            for (var i = 1, n = x.length; i < n; i++) {
                p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
            }
            return p;
        },
        store: function (p, v) {
            if (p) {
                P.result[P.result.length] =
                P.resultType.toUpperCase() == "PATH" ? P.asPath(p) : v;
            }
            return !!p;
        },
        trace: function (expr, val, path) {
            if (expr !== "") {
                var x = expr.split(";"), loc = x.shift();
                x = x.join(";");
                if (val && val.hasOwnProperty(loc)) {
                    P.trace(x, val[loc], path + ";" + loc);
                } else if (loc === "*") {
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        P.trace(m + ";" + x, v, p);
                    });
                } else if (loc === "..") {
                    P.trace(x, val, path);
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
                    });
                }
                else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                {
                    P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val,
                            path);
                } else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                {
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v instanceof Array ? v[m] : v,
                                   m)) {
                            P.trace(m + ";" + x, v, p);
                        }
                    });
                }// issue 5 resolved
                else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                {
                    P.slice(loc, x, val, path);
                } else if (/,/.test(loc)) { // [name1,name2,...]
                    for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++) {
                        P.trace(s[i] + ";" + x, val, path);
                    }
                }
            }
            else {
                P.store(path, val);
            }
        },
        walk: function (loc, expr, val, path, f) {
            if (val instanceof Array) {
                for (var i = 0, n = val.length; i < n; i++) {
                    if (i in val) {
                        f(i, loc, expr, val, path);
                    }
                }
            }
            else if (typeof val === "object") {
                for (var m in val) {
                    if (val.hasOwnProperty(m)) {
                        f(m, loc, expr, val, path);
                    }
                }
            }
        },
        slice: function (loc, expr, val, path) {
            if (val instanceof Array) {
                var len = val.length, start = 0, end = len, step = 1;
                loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) {
                    start = parseInt($1 || start);
                    end = parseInt($2 || end);
                    step = parseInt($3 || step);
                });
                start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                for (var i = start; i < end; i += step) {
                    P.trace(i + ";" + expr, val, path);
                }
            }
        },
        eval: function (x, _v, _vname) {
            try {

                var uid = JSON.stringify({query: x, obj: _v, index: _vname})

                cache[uid] = cache[uid] || {};

                if (!cache[uid].functionToInvoke) {

                    var fun =function (x, _v, _vname, $) {

                        if(!cache[uid].innerFunctionToInvoke) {

                            var actionToCall = 'return x.replace(/(^|[^\\\\])@/g, "$1_v").replace(/\\@/g, "@")'

                            cache[uid].innerFunctionToInvoke= new Function(['x', '_v', '_vname', '$'],
                                                                 actionToCall);
                        }

                        x = cache[uid].innerFunctionToInvoke.apply(this, [x, _v, _vname, $])

                        // TODO: cache seconday function below is it possible or NO since signature is totally dynamic

                        var action2 = 'return ' + x;
                        var re = new Function(['x', '_v', '_vname', '$'], action2);

                        var x2 = re.apply(this, [x, _v, _vname, $])

                        return x2;
                    }.bind(this);
                    cache[uid] = {functionToInvoke: fun};
                }

                var x2 = cache[uid].functionToInvoke(x, _v, _vname, $)

                return $ && _v && x2;
            }  // issue 7 : resolved ..
            catch (e) {
                throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/(^|[^\\])@/g,
                                                                                  "$1_v").replace(/\\@/g,
                                                                                                  "@"));
            }  // issue 7 : resolved ..
        }
    };

    var $ = obj;
    if (expr && obj && (P.resultType.toUpperCase() == "VALUE" || P.resultType.toUpperCase()
                                                                 == "PATH")) {
        P.trace(P.normalize(expr).replace(/^\$;?/, ""), obj, "$");  // issue 6 resolved
        return P.result.length ? P.result : false;
    }
}

var JSONPath = (function () {

    return function(opts, obj, expr) {
        this.cache = this.cache || {}
        return jsonPath1(obj, expr, opts, this.cache);
    }
})()
