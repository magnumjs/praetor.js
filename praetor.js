/* Praeter.js 0.1.6 - Stored Procedures (JS Code blocks) for JSON results via XPath JSON
 *
 * Copyright (c) 2015 Michael Glazer (https://github.com/magnumjs/praetor.js)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */

//includes original JSONPath lib refactored

// using JSONPath query syntax
// query a data store JSON object
// name the query for programmatic use
// name a code block against that query resultset
// get the state - to reuse it elsewhere

var p = (function (undefined) {
    'use strict';


    // Query Engine Interface Endpoint
    // TODO: make this pluggable to any query engine
    // DefiantJS, JSONPath, JSONQuery, JPath etc...
    function getjsonpath() {
        if (typeof JSONPath === 'undefined') {
            throw new Error("JSONPath is required: ()")
        }
        return JSONPath
    }

    // BEGIN UTIL FUNCTIONS
    // TODO: why two mege functions, diff, nested issues?
    // explain functional diff between these two
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

    function clone(a) {
        return JSON.parse(JSON.stringify(a));
    }
    // END UTIL FUNCTIONS

    var OBJECT = "[object Object]",NULL = "[object Null]", ARRAY = "[object Array]", STRING = "[object String]", FUNCTION = "function"
    var type = {}.toString

    // default 'global' state ID
    var rootid = 'rootid'

    var defaults = {jsonPathOptions: {}}, // library defaults
        options = {}, // user supplied
        settings = {} // combo of defaults and over rides in options

    //return wireframe - not modifiable
    p.model = function () {
        return {
            stores: {},
            queries: {},
            procs: {}
        }
    }


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

    // API METHODS - step order

    // overwrite existing leaves (stores, procs, queries)
    p.setState = function (state, id) {
        var nstate = copy(state || {}, p.model())
        p.map(id, nstate)
    }
    p.getState = function (id) {
        //return a copy not a reference
        return clone(p.map(id));
    }

    // API DATA STORE

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

    // API QUERIES

    p.setJsonQuery = function (name, JsonPathQuery, storeName, id) {
        p.map(id).queries[name] = {
            query: JsonPathQuery,
            store: storeName
        }
    }
    p.getJsonQuery = function (name, id) {
        return p.map(id).queries[name]
    }
    p.getJsonQueryResult = function (name, parms, id) {
        var jsonQuery = p.getJsonQuery(name, id)
        var data = p.getDataStore(jsonQuery.store, id)

        // interpolate the query with the parms
        for(var k in parms){
            jsonQuery.query=jsonQuery.query.split(k).join(parms[k])
        }
        var result = getjsonpath()(p.settings().jsonPathOptions, data, jsonQuery.query)
        return result
    }

    // API PROCEDURES

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
            result[val] = p.getJsonQueryResult(val, parms, id)
            return result
        })

        return createFunctionExec(queryResults, storedProc, parms);
    }

    // Polymorphic function can have name or null
    // can have named queries or not
    // TODO: refactor into above method with this function name
    p.proc = function (name, json, queries, code, parms, id) {
        // if 1 argument run it
        if (arguments.length == 1 && type.call(name) == OBJECT) {
            return p.getStoredProcResult(name.name, name.parms, name.id)
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
                return p.getJsonQueryResult(query, parms, id)
            }
            // interpolate the query with the parms
            for(var k in parms){
                query=query.split(k).join(parms[k])
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

    // Reusable core function

    // public cache access for tests?
    // across all state IDs?
    var funCache={};
    function createFunctionExec(queryResults, storedProc, parms) {

        // create unique has id
        var uid = getjsonpath().hashCode(JSON.stringify({proc: storedProc, parms : parms}))
        funCache[uid] = funCache[uid] = {}

        if(!funCache[uid].fun) {
            // create temp function
            funCache[uid].fun = Function(storedProc.code)
        }
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
        var ret = funCache[uid].fun.apply(context)
        if (ret) {
            return ret
        }
        return context.results
    }

    return p
})();

if (typeof module != "undefined" && module !== null && module.exports) {
    module.exports = p
}
else if (typeof define === "function" && define.amd) {
    define(function () {
        return p
    });
}
