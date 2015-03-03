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
  describe('p() settings', function() {
    it("has defaults", function() {
      expect(p.settings()).toEqual({
        jsonPathOptions: {}
      })
    })
    it("can add new properties", function() {
      expect(p.settings()).toEqual({
        jsonPathOptions: {}
      })
      p.setOptions({
        somethingnew: true
      })
      expect(p.settings()).toEqual({
        jsonPathOptions: {},
        somethingnew: true
      })
    })
    it("allows defaults to be override", function() {
      expect(p.settings()).toEqual({
        jsonPathOptions: {},
        somethingnew: true
      })
      p.setOptions({
        jsonPathOptions: {
          resultType: 'value' // or 'path'
        }
      })
      expect(p.settings()).toEqual({
        jsonPathOptions: {
          resultType: 'value'
        },
        somethingnew: true
      })
    })
  });
  describe('p() unique id instances', function() {
    it("can set & get a unique instance of datastore", function() {
      p.setDataStore('test', {}, 'id')
      expect(p.getDataStore('test', 'id')).toEqual({});
      expect(p.getDataStore('test', 'id2')).toEqual(undefined);
      p.setDataStore('test2', {}, 'id2')
      expect(p.getDataStore('test2', 'id2')).toEqual({});
      expect(p.getDataStore('test2', 'id')).toEqual(undefined);
    });
  });
  describe('p.proc()', function() {
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
});
