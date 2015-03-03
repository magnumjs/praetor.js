// specs code
describe("Praetor", function() {
  var booksString = '{"books":[{"title":"kids", "author":"adams"},{"title":"action", "author":"johns"}]}';
  var books = JSON.parse(booksString);
  p.setDataStore('books', books);

  describe('p() unique id instances', function() {
    it("can set & get a unique instance of datastore", function() {
      expect(p('id').setDataStore('test', {}).getDataStore('test')).toEqual({});
      expect(p('id2').getDataStore('test')).toEqual(undefined);
      expect(p('id2').setDataStore('test2', {}).getDataStore('test2')).toEqual({});
      expect(p('id').getDataStore('test2')).toEqual(undefined);
    });
    it("can set & get a unique instance of state", function() {
      expect(p('id', {
        stores: {
          books: []
        }
      }).getState()).toEqual({
        stores: {
          books: []
        },
        queries: {},
        procs: {}
      });
      expect(p('id2', {
        stores: {
          movies: []
        }
      }).getState()).toEqual({
        stores: {
          movies: []
        },
        queries: {},
        procs: {}
      });
      expect(p('id2', {
        stores: {
          comics: []
        }
      }).getState()).toEqual({
        stores: {
          movies: [],
          comics: []
        },
        queries: {},
        procs: {}
      });
      expect(p('id', {
        queries: {
          'titles': {
            query: '$..title',
            store: 'books'
          }
        }
      }).getState()).toEqual({
        stores: {
          books: []
        },
        queries: {
          titles: {
            query: '$..title',
            store: 'books'
          }
        },
        procs: {}
      });
      expect(p.getState()).toEqual({
        stores: {
          books: {
            books: [{
              title: 'kids',
              author: 'adams'
            }, {
              title: 'action',
              author: 'johns'
            }]
          }
        },
        queries: {},
        procs: {}
      });
    })
  })

  describe('p.proc', function() {
    it('can take json and single jsonpath queriy to render a result json', function() {
      expect(p.proc(books, ['$..title'])).toEqual([
        ['kids', 'action']
      ]);
    })
    it('can take json and multiple jsonpath queries to render a result json', function() {
      expect(p.proc(books, ['$..title', '$..author'])).toEqual([
        ['kids', 'action'],
        ['adams', 'johns']
      ]);
    })
    it('can take json and single jsonpath queriy to render a result json with code', function() {
      expect(p.proc(books, ['$..title'], 'this.results[0].reverse()')).toEqual([
        ['action', 'kids']
      ]);
    })
  })

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
