// specs code
describe("PraetorJS", function() {
  var booksString = '{"books":[{"title":"kids", "author":"adams"},{"title":"action", "author":"johns"}]}';
  var books = JSON.parse(booksString);
  p.setDataStore('books', books);

  it("can set & get a data store", function() {
    expect(p.getDataStore('books')).toEqual(books);
  });

  it("can set & get a JSON path query", function() {
    p.setJsonQuery('getBookTitles', '$..title', 'books');
    expect(p.getJsonQueryResult('getBookTitles')).toEqual(['kids', 'action'])
  });

  it("can set & get the entire state", function() {
    expect(p.getState()).toEqual({
      stores: {
        books: books
      },
      queries: {
        getBookTitles: {
          query: '$..title',
          store: 'books'
        }
      },
      procs: {}
    });
  });


  it("can set & get a stored procedure with return", function() {

    var code = '\
       if(this.params.upperCase){ \
            this.results[0]["getBookTitles"]=this.results[0]["getBookTitles"]. \
            map(function(x) { \
              return x.toUpperCase(); \
            }); \
        } \
        return this.results \
        ';

    p.setStoredProc('convertBookTitles', ['getBookTitles'], code, {
      upperCase: false
    })
    var results = p.getStoredProcResult('convertBookTitles', {
      upperCase: true
    });

    expect(results[0]['getBookTitles']).toEqual(["KIDS", "ACTION"]);
  });


  it("can set & get a stored procedure with NO return", function() {

    var code = '\
       if(this.params.upperCase){ \
            this.results[0]["getBookTitles"]=this.results[0]["getBookTitles"]. \
            map(function(x) { \
              return x.toUpperCase(); \
            }); \
        } \
        ';

    p.setStoredProc('convertBookTitles', ['getBookTitles'], code, {
      upperCase: false
    })
    var results = p.getStoredProcResult('convertBookTitles', {
      upperCase: true
    });

    expect(results[0]['getBookTitles']).toEqual(["KIDS", "ACTION"]);
  });

});
