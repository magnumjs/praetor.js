/* Praeter.js 0.1 - Stored Procedures (JS Code blocks) for JSON results via XPath JSON
 *
 * Copyright (c) 2015 Michael Glazer (https://github.com/magnumjs/praetor.js)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */


// REQUIRES! JSONpath - https://github.com/s3u/JSONPath

// using JSONpath query syntax
// query a data store JSON object
// name the query for programmatic use
// name a code block against that query resultset
// get the state - to reuse it elsewhere

var p = (function(require, jsonpath, undefined) {
  'use strict';

  // Make sure to know if we are in real node or not (the `require` variable
// could actually be require.js, for example.
  var isNode = typeof module !== 'undefined' && !!module.exports;

  jsonpath =typeof jsonpath !== 'undefined' ? jsonpath : (isNode && require && typeof require == 'function' ?
                                                          require('jsonpath') :  undefined);

  if(!jsonpath)throw Error("JSONPath is required: (https://github.com/s3u/JSONPath)")

  // UTIL FUNCTIONS
  var realMerge = function(to, from) {
    for (var n in from) {
      if (typeof to[n] != 'object') {
        to[n] = from[n];
      } else if (typeof from[n] == 'object') {
        to[n] = realMerge(to[n], from[n]);
      }
    }
    return to;
  };
  // TODO: why two mege functions, diff, nested issues?
  function copy(to, from){
    for (var attr in from) {
      to[attr] = to[attr] === undefined ? from[attr] : to[attr]
    }
    return to
  }
  function createFunctionExec(queryResults, storedProc, parms) {
    // create temp function
    var fun = Function(storedProc.codeBody)

    //merge parms with defaults 
    //TODO: parms will override if attr don't exist
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
    if (ret) return ret
    return context.results
  }
  // UTIL FUNCTIONS

  // data contruct
  var map = {}
  map.stores = {}
  map.queries = {}
  map.procs = {}

  // copy - don't modify!
  var model = function() {
    return JSON.parse(JSON.stringify(map))
  }()

  var defaults = {jsonPathOptions:{}}, // library defaults
      options  = {}, // user supplied
      settings = {} // combo of defaults and over rides in options

  var OBJECT = "[object Object]"
  var type = {}.toString;

  // initializer
  function p(state, id, options) {
    // add options with defaults to get settings
    //  p.settings = options + defaults
    // attach to id
    p.setOptions(options, id)
    //merge incoming state with copy of model
    var nstate= copy(state, JSON.parse(JSON.stringify(model)))
    p.map(id, nstate)
  }
  p.setOptions=function(noptions, id){
    // states options / id
    options = noptions
    p.settings(noptions, id);
  }
  p.getOptions=function(){
    return options
  }

  p.settings=function(noptions, id){
    // cache settings ?
    // settings into state?
    settings= realMerge(defaults, noptions)
    return settings
  }

  p.map = function(id, state) {
    this.state = this.state || {}
    if (id && type.call(id) !== OBJECT) {
      if (!this.state[id])
        this.state[id] = state || JSON.parse(JSON.stringify(model))
      return this.state[id]
    }
    this.state[p.id] = state || this.state[p.id] || map
    return this.state[p.id]
  }

  p.proc = function(json, queries, code, parms) {
    // can be raw or by stored names
    var queryResults = queries.map(function(query, idx) {
      return jsonpath(p.settings().jsonPathOptions, json, query)
    })
    var storedProc = {
      parms: parms,
      codeBody: code
    };
    //return results;
    return createFunctionExec(queryResults, storedProc, parms);
  }

  p.setDataStore = function(name, data, id) {
    p.map(id).stores[name] = data
  }

  p.getDataStore = function(name, id) {
    return p.map(id).stores[name]
  }

  p.setJsonQuery = function(name, JsonPathQuery, storeName, id) {
    p.map(id).queries[name] = {
      query: JsonPathQuery,
      store: storeName
    }
  }
  p.getJsonQuery = function(name, id) {
    return p.map(id).queries[name]
  }
  p.getJsonQueryResult = function(name, id) {
    var jsonQuery = p.getJsonQuery(name, id)
    var data = p.getDataStore(jsonQuery.store, id)
    var result = jsonpath(p.settings().jsonPathOptions, data, jsonQuery.query)
    return result
  }

  p.setStoredProc = function(name, namedQueries, codeBody, parms, id) {
    p.map(id).procs[name] = {
      namedQueries: namedQueries,
      codeBody: codeBody,
      parms: parms
    }
  }
  p.getStoredProc = function(name, id) {
    return p.map(id).procs[name]
  }

  p.getStoredProcResult = function(name, parms, id) {
    var storedProc = p.getStoredProc(name, id)
    var queryResults = [];
    // get all results
    queryResults = storedProc.namedQueries.map(function(val, idx) {
      var result = {}
      result[val] = p.getJsonQueryResult(val, id)
      return result
    })
    return createFunctionExec(queryResults, storedProc, parms);
  }

  // api methods
  p.setState = function(id, state) {
    p.map(id, state)
  }
  p.getState = function(id) {
    return JSON.parse(JSON.stringify(p.map(id)));
  }

  return p

})(typeof require === 'undefined' ? undefined : require, typeof jsonpath === 'undefined' ? typeof JSONPath === 'undefined' ? undefined: JSONPath : jsonpath);

if (typeof module != "undefined" && module !== null && module.exports) module.exports = p;
else if (typeof define === "function" && define.amd) define('',['jsonpath'],function(jsonpath) {
  return p
});