describe('p.proc()', function () {

    var code = '\
       if(this.params.upperCase){ \
            this.results[0]["getBookTitles"]=this.results[0]["getBookTitles"]. \
            map(function(x) { \
              return x.toUpperCase(); \
            }); \
        } \
        ';

    it("can execute a stored proc", function () {

        // setup a proc
        p.setDataStore('books', books)

        p.setJsonQuery('getBookTitles', '$..title', 'books');

        p.setStoredProc('convertBookTitles2', ['getBookTitles'], code, {
            upperCase: false
        })
        var results = p.proc({name:'convertBookTitles2'});

        expect(results[0].getBookTitles).toEqual(
            ['kids', 'action']
        );

    })

    it("can create and execute a stored proc", function () {
        // setup a proc
        p.setDataStore('books', books)

        p.setJsonQuery('getBookTitles', '$..title', 'books');


        p.proc('convertBookTitles23',null, ['getBookTitles'], code, {
            upperCase: false
        })

        expect(p.getStoredProc('convertBookTitles23')).not.toEqual({})
        var results = p.proc({name:'convertBookTitles23'});

        expect(results[0].getBookTitles).toEqual(
            ['kids', 'action']
        );

    })

    it("can take named queries argument",function(){
        expect(p.proc(null,books, ['getBookTitles']))
            .toEqual([
                         ['kids', 'action']
                     ]);
    })

    it("can take multiple queries",function(){
        expect(p.proc(null,books, ['$..title','$..author']))
            .toEqual([ [ 'kids', 'action' ], [ 'adams', 'johns' ] ] );
    })

    it("can take datastore name as first argument", function () {
        p.setDataStore('mystore', books)
        expect(p.getDataStore('mystore')).toEqual(books)
        expect(p.proc(null,'mystore', ['$..title']))
            .toEqual([
                         ['kids', 'action']
                     ]);
    })

    it('can take json and single jsonpath query to render a result json', function () {
        expect(p.proc(null,books, ['$..title']))
            .toEqual([
                         ['kids', 'action']
                     ]);
    })
    it('can take json and multiple jsonpath queries to render a result json', function () {
        expect(p.proc(null,books, ['$..title', '$..author']))
            .toEqual([
                         ['kids', 'action'],
                         ['adams', 'johns']
                     ]);
    })
    it('can take json and single jsonpath queriy to render a result json with code', function () {
        expect(p.proc(null,books, ['$..title'], 'this.results[0].reverse()'))
            .toEqual([
                         ['action',
                          'kids']
                     ]);
    })
})