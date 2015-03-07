
describe('p.proc()', function () {

    var booksString = '{"books":[{"title":"kids", "author":"adams"},{"title":"action", "author":"johns"}]}';
    var books = JSON.parse(booksString);

    it('can take json and single jsonpath query to render a result json', function () {
        expect(p.proc(books, ['$..title'])).toEqual([
                                                        ['kids', 'action']
                                                    ]);
    })
    it('can take json and multiple jsonpath queries to render a result json', function () {
        expect(p.proc(books, ['$..title', '$..author'])).toEqual([
                                                                     ['kids', 'action'],
                                                                     ['adams', 'johns']
                                                                 ]);
    })
    it('can take json and single jsonpath queriy to render a result json with code', function () {
        expect(p.proc(books, ['$..title'], 'this.results[0].reverse()')).toEqual([
                                                                                     ['action',
                                                                                      'kids']
                                                                                 ]);
    })
})