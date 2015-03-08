/* Praeter.js 0.1.5 - Stored Procedures (JS Code blocks) for JSON results via XPath JSON
 *
 * Copyright (c) 2015 Michael Glazer (https://github.com/magnumjs/praetor.js)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */


// REQUIRES! JSONPath - https://github.com/s3u/JSONPath

// using JSONPath query syntax
// query a data store JSON object
// name the query for programmatic use
// name a code block against that query resultset
// get the state - to reuse it elsewhere

var p = (function (undefined) {
    'use strict';
    var rootid = 'rootid'

    function getjsonpath() {
        if (typeof JSONPath === 'undefined') {
            throw new Error("JSONPath is required: (https://github.com/s3u/JSONPath)")
        }
        return JSONPath
    }

    // UTIL FUNCTIONS
    var realMerge = function (to, from) {
        for (var n in from) {
            if (typeof to[n] != 'object') {
                to[n] = from[n];
            } else if (typeof from[n] == 'object') {
                if(type.call(from[n]) == NULL) {
                    // remove it
                    delete to[n]
                    continue;
                }
                to[n] = realMerge(to[n], from[n]);
            }
        }
        return to;
    };

    function clone(a) {
        return JSON.parse(JSON.stringify(a));
    }

    // TODO: why two mege functions, diff, nested issues?
    function shallowCopy(to, from) {
        for (var attr in from) {
            to[attr] = to[attr] === undefined ? from[attr] : to[attr]
        }
        return to
    }

    function copy(to, from) {
        for (var attr in from) {
            if (typeof to[attr] != 'object' ) {
                to[attr] = to[attr] === undefined ? from[attr] : to[attr]
            } else {
                if(type.call(to[attr]) == NULL){
                    delete to[attr]
                    continue;
                }
                to[attr] = copy(to[attr], from[attr])
            }
        }
        return to
    }

    function createFunctionExec(queryResults, storedProc, parms) {
        // create temp function
        var fun = Function(storedProc.code)
        parms = parms || {}
        //merge parms with defaults
        //TODO: parms will override if attr don't exist
        // This is NOT a merge
        for (var attr in storedProc.parms) {
            parms[attr] = parms[attr] === undefined ? storedProc.parms[attr] : parms[attr]
        }
        //TODO: optional context via defaults override options
        var context = {
            results: queryResults,
            params: parms
        }
        // execute proc and return results
        var ret = fun.apply(context)
        if (ret) {
            return ret
        }
        return context.results
    }

    // UTIL FUNCTIONS

    //TODO: is map necessary?
    // since we now have p.model?
    // data contruct
    //var map = {}
    //map.stores = {}
    //map.queries = {}
    //map.procs = {}

    // copy - don't modify!
    //var model = function () {
    //    return JSON.parse(JSON.stringify(map))
    //}()

    //return wireframe
    p.model = function () {
        return {
            stores: {},
            queries: {},
            procs: {}
        }
    }

    var defaults = {jsonPathOptions: {}}, // library defaults
        options = {}, // user supplied
        settings = {} // combo of defaults and over rides in options

    var OBJECT = "[object Object]",NULL = "[object Null]", ARRAY = "[object Array]", STRING = "[object String]", FUNCTION = "function"
    var type = {}.toString

    // initializer
    function p(state, id, options) {
        // add options with defaults to get settings
        //  p.settings = options + defaults
        // attach to id
        p.setOptions(options, id)
        //merge incoming state with copy of model
        var nstate = realMerge( p.getState(id), state || {})
        p.map(id, nstate)
    }

    p.setOptions = function (noptions, id) {
        // states options / id
        options = noptions
        p.settings(noptions, id);
    }
    p.getOptions = function () {
        return options
    }

    p.settings = function (noptions, id) {
        // cache settings ?
        // settings into state?
        settings = realMerge(defaults, noptions)
        return settings
    }

    // TODO: should NOT be publicly accessible!!
    p.map = function (id, state) {
        this.state = this.state || {}
        if (id) {
            // if passed state set it
            // if not but the id is in state get that
            // if no state and id is not set in state yet
            // make it equal a copy of the basic model
            this.state[id] = state || this.state[id] || p.model()
            return this.state[id]
        }
        this.state[rootid] = state || this.state[rootid] || p.model()
        return this.state[rootid]
    }

    // TODO: remove is this necessary seems redundant to p.proc
    // setting a named proc
    p.procWith = function (name, storeName, queries, code, parms) {
        // if 1 argument run it
        if (arguments.length == 1) {
            return p.getStoredProcResult(name, id)
        } else {
            p.setJsonQuery(name, queries, storeName, id)
            p.setStoredProc(name, name, code, parms, id)
        }
    }

    p.proc = function (name, json, queries, code, parms, id) {
        // if 1 argument run it
        if (arguments.length == 1) {
            return p.getStoredProcResult(name)
        }
        // store the proc if named
        if (name) {
            return p.setStoredProc(name, queries, code, parms, id)
        }
        // if JSON is a string check store names
        if (type.call(json) == STRING) {
            json = p.getDataStore(json, id)
            // add the queries to the store?
            // under the proc name?
        }
        // can be raw or by stored names
        var queryResults = queries.map(function (query, idx) {
            // check if it's a name query
            if (p.getJsonQuery(query, id)) {
                return p.getJsonQueryResult(query, id)
            }
            return getjsonpath()(p.settings().jsonPathOptions, json, query)
        })
        var storedProc = {
            parms: parms,
            code: code
        };
        //return results;
        return createFunctionExec(queryResults, storedProc, parms);
    }

    p.setDataStore = function (name, data, id) {
        p.map(id).stores[name] = data
    }

    p.getDataStore = function (name, id) {
        return p.map(id).stores[name]
    }

    p.removeDataStore = function (name, id) {
        delete p.map(id).stores[name]
    }

    p.emptyDataStore = function (name, id) {
        p.map(id).stores[name] = {}
    }

    p.setJsonQuery = function (name, JsonPathQuery, storeName, id) {
        p.map(id).queries[name] = {
            query: JsonPathQuery,
            store: storeName
        }
    }
    p.getJsonQuery = function (name, id) {
        return p.map(id).queries[name]
    }
    p.getJsonQueryResult = function (name, id) {
        var jsonQuery = p.getJsonQuery(name, id)
        var data = p.getDataStore(jsonQuery.store, id)
        var result = getjsonpath()(p.settings().jsonPathOptions, data, jsonQuery.query)
        return result
    }

    p.setStoredProc = function (name, namedQueries, codeBody, parms, id) {
        p.map(id).procs[name] = {
            queries: type.call(namedQueries) == ARRAY ? namedQueries : namedQueries.split(','), // must be an array if comma separated then split
            code: codeBody,
            parms: parms
        }
    }
    p.getStoredProc = function (name, id) {
        return p.map(id).procs[name]
    }

    p.getStoredProcResult = function (name, parms, id) {
        var storedProc = p.getStoredProc(name, id)
        var queryResults = [];

        // get all results
        queryResults = storedProc.queries.map(function (val, idx) {
            var result = {}
            result[val] = p.getJsonQueryResult(val, id)
            return result
        })

        return createFunctionExec(queryResults, storedProc, parms);
    }

    // overwrite existing leaves (stores, procs, queries)
    p.setState = function (state, id) {
        var nstate = copy(state || {}, p.model())
        p.map(id, nstate)
    }
    p.getState = function (id) {
        //return a copy not a reference
        return clone(p.map(id));
    }

    return p
})();

if (typeof module != "undefined" && module !== null && module.exports) {
    JSONPath = require('JSONPath')
    module.exports = p
}
else if (typeof define === "function" && define.amd) {
    define('', ['JSONPath'], function (JSONPath) {
        return p
    });
}
