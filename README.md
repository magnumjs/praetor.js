#Praetor.js 
##JSON Path Stored Procedures
#### A JSON tunnel tier library, to query and filter results with stored procedures

## Getting started

#### One internal (bundled) Dependency is on [JSONPath](https://code.google.com/p/json-path/)

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

var code='console.log(this.params, this.results[0]["getBookTitles"]);'
+' if(this.params.upperCase){ '
+' this.results[0]["getBookTitles"] =this.results[0]["getBookTitles"].map(function(x) { return x.toUpperCase(); }); '
+'  }return this.results';

p.setStoredProc('convertBookTitles',['getBookTitles'],code,{upperCase : false})
console.log(p.getStoredProcResult('convertBookTitles', {upperCase : true })[0]['getBookTitles'])
```
> Created by Michael Glazer 3/1/2015
