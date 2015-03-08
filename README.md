<img align="right" src="https://cloud.githubusercontent.com/assets/6472507/6443569/c255e31a-c0c5-11e4-9818-6423d7db04bb.png" style=" background:no-repeat;background-position: right top;display:block;position:absolute;top:0;left:0;width: 00%;height:100%;opacity: 0.2;z-index: -1;" />
#Praetor.js 
####JSON Path Stored Procedures
A tiny JSON processing tunnel tier library, to query and filter results with stored JS procedures

##WHY
Praetorjs - the tiny tunnel-tier library that can create & run named stored procedures (JSONPath queries & JS code)

It is designed to manipulate JSON data after it is fetched & before it is rendered, in a pre-determined callable way.

Real world example - create & edit your procedures - name them, everything is important except for the actual data (stores), that comes at run time.

When you fetch real data, attach it to the previously named stores, then execute your procedures against them to get your results.

```javascript
// pre-define a procedure - this is a simple JSONPath Query only example - no JS code or parms
p.proc('getTopActionMovies','movies',"$..data.movies[?(@.genres.indexOf('Action')>-1)]",/* code, parms, id */)
// get some realtime data
getMoviesAJAX().then(data){
  p({stores:{movies:data}}, id) // allows the store to be used elsewhere by other praetors
  return p.proc('getTopActionMovies'/*, params, id */)
}
```
## Getting started

Download Praetor.JS
```html
<script src="//cdn.rawgit.com/magnumjs/praetor.js/master/dist/praetor-0.1.5.min.js"></script>
```

Includes the (bundled) dependency of [JSONPath](https://github.com/s3u/JSONPath)

[DEMO admin site (using Mithril.js!)](https://magnumjs.github.io/praetor.js)

####Simple Example

JSON:
```javascript
{"movies":[{"title":"American Sniper"},{"title":"Terminator"}]}
```

```javascript
p.proc (
  getMovies (),
  ['$..title'],
  'this.results[0].reverse()'
)
```

Results:
```javascript
  ["Terminator","American Sniper"]
```
####API methods
Add a data store.
```javascript
p.setDataStore( name, data )
```

Create a named Query on a given dataStore
```javascript
p.setJsonQuery ( name, JSONPathQuery, storeName )
```

Execute JSONPath Query by name and get result
```javascript
getJsonQueryResult ( name, options )
```

## Stored Procedure

### Pure JavaScript code block with query results
#### Is given its own context of the named query results and optional params to override defaults

Create a stored proc with a given name, named existing queries, the code to be executed and its default properties (added to the executing context)
```javascript
p.setStoredProc ( name,  namedQueries , codeBody , parms )
```

Execute a given named stored procedure and pass in overriding default properties and it will return the results.
```javascript
getStoredProcResult ( name, params )
```


## Full Example

```javascript
p.setDataStore('books',{books:[{title:'kids', author:'adams'},{title:'action', author:'johns'}]});
p.setJsonQuery('getBookTitles','$..title', 'books');
console.log(p.getJsonQueryResult('getBookTitles'))
console.log(p.getState())

var code='console.log(this.params, this.results[0]["getBookTitles"]); \
 if(this.params.upperCase){ \
 this.results[0]["getBookTitles"]=this.results[0]["getBookTitles"].map(function(x) { return x.toUpperCase(); }); \
  }';

p.setStoredProc('convertBookTitles',['getBookTitles'],code,{upperCase : false})
console.log(p.getStoredProcResult('convertBookTitles', {upperCase : true })[0]['getBookTitles'])
```

##Jasmine Specs
http://rawgit.com/magnumjs/praetor.js/master/tests/specRunner.html

> Created by Michael Glazer 3/1/2015

#More

###Simple nomenclature

### Simple data model

```javascript
model : {
  stores : {},
  queries : {},
  procs : {}
}
```

That is the basic praetor state model

the structures for each of this top nodes are as follows:

###Stores
```javascript
  { stores : {
    storename (String) : data (Object)
    } 
  }
  
  e.g. 
  p ( {stores: {books:{[{title:"book1"},{title:"book2"},{title:"book3"}]} } }  /*, id */ )
  will add & overwrite that store name in the state
  given an optional last argument id it will be only in that ids state map

```
###Queries
```javascript
{queries : { 
  queryName (String) : {
    query: JsonPathQuery (String),
    store: storeName (String)
  }
}

  e.g.
  p ( {queries : { getAllBookTitles : { query : "$..title", store : "books" }} )
```

###Procs
```javascript
{procs : {
  procName (String): {
    queries: [] (Array), // must be an array if comma separated then split
    code: '' (String),
    parms: {} (Object)
  }
} 
  e.g.
  
  p ( {procs : { sortBookTitles : { queries : ['getAllBookTitles'], code : "this.results[0]['getAllBookTitles'].reverse()", parms: {} }} )
```
####Notes
parms are an optional map of default parameters that can be overwritten when the stored procedure is executed

in codebody you get a context with two properties
this.results (an array of results sets matching the name of your query
this.parms (the map of default and or overwritten parameters sent in)

Whatever you set to the this.results is what will be returned at run time
You can also return 



### State & IDs

By default there is no ID required and everything is global all state is accessible from the same praetor instance

Every method has a last argument optional id to identify the state you are discussing with that method
```javascript
p(state, options, id) // it will merge any existing state

p.setState(state, id) // it will overwrite with any existing state

p.getState(id)
```

