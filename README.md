<img align="right" src="https://cloud.githubusercontent.com/assets/6472507/6443569/c255e31a-c0c5-11e4-9818-6423d7db04bb.png" style=" background:no-repeat;background-position: right top;display:block;position:absolute;top:0;left:0;width: 00%;height:100%;opacity: 0.2;z-index: -1;" />
#Praetor.js 
##JSON Path Stored Procedures
#### A tiny JSON processing tunnel tier library, to query and filter results with stored JS procedures

## Getting started

Download Praetor.JS
```html
<script src="http://cdn.rawgit.com/magnumjs/praetor.js/master/praetor.min.js"></script>
```

#### One internal (bundled) Dependency is on [JSONPath](https://github.com/s3u/JSONPath)

Simple Example

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
Quick Setup
1. Add a data store.
```javascript
p.setDataStore( name, data )
```

2. Create a named Query on a given dataStore
```javascript
p.setJsonQuery ( name, JSONPathQuery, storeName )
```

3. execute JSONPath Query by name and get result
```javascript
getJsonQueryResult ( name, options )
```

## Stored Procedure

### Pure JavaScript code block with query results
#### Is given its own context of the named query results and optional params to override defaults

1. Create a stored proc with a given name, named existing queries, the code to be executed and its default properties (added to the executing context)
```javascript
p.setStoredProc ( name,  namedQueries , codeBody , parms )
```

2. Execute a given named stored procedure and pass in overriding default properties and it will return the results.
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
http://cdn.rawgit.com/magnumjs/praetor.js/master/tests/specRunner.html

> Created by Michael Glazer 3/1/2015
