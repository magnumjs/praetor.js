<img align="right" src="https://cloud.githubusercontent.com/assets/6472507/6443569/c255e31a-c0c5-11e4-9818-6423d7db04bb.png" style=" background:no-repeat;background-position: right top;display:block;position:absolute;top:0;left:0;width: 00%;height:100%;opacity: 0.2;z-index: -1;" />
#Praetor.js 
####JSON Path Stored Procedures
A tiny JSON processing tunnel tier library (2kb gzipped), to query and filter results with stored JS procedures

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
<script src="//rawgit.com/magnumjs/praetor.js/master/praetor.min.js"></script>
```

Includes an enhanced version of [JSONPath](http://goessner.net/articles/JsonPath/)
(Will be optional and pluggable in the Future) e.g.:
- JSONQuery
- JSONSelect
- JSONPath

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

####Dynamic Example (from the tests/specs below)

```javascript
//data 
var data={movies:[{"title":"test1","genres":["Action","Drama"]},{"title":"test3","genres":["Comedy"]},{"title":"test2","genres":["Romance","Drama"]}]}

// define
p.proc('getTopDramaMovies','movies',"byDrama")

// inflate
p({stores:{movies:data},queries:{"byDrama":{store:"movies",query:"$..movies[?(@.genres.indexOf(PARM)>-1)]"}}}) // allows the store to be used elsewhere by other praetors

// run
expect(p.proc({name:'getTopDramaMovies', parms:{PARM:'"Drama"'}})[0].byDrama.length).toEqual(2)
```

##Jasmine Specs
http://rawgit.com/magnumjs/praetor.js/master/tests/specRunner.html

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

Passed its own context of the named query results and optional params to override defaults.

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

the structures for each of these top nodes are as follows:

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
You can also return whatever you like

####DELETING
```javascript
p({procs:{tester:null}}, id) // merges
p.setState({procs:{tester:null}}, id) // overwrites from the root
```
The first one will only remove that proc name
The second will set the value of procs to literally tester : null

### State & IDs

By default there is no ID required and everything is global all state is accessible from the same praetor instance

Every method has a last argument optional id to identify the state you are discussing with that method
```javascript
p(state, options, id) // it will merge any existing state

p.setState(state, id) // it will overwrite with any existing state

p.getState(id)
```

