describe("error handling",function(){

    it("can handle code (syntax) errors",function(){
        expect({}.toString.call(p.proc(null,books, ['getBookTitles'],'this.results==')))
            .toEqual('[object Error]');
    })

    it("can handle code (undefined) errors",function(){
        expect({}.toString.call(p.proc(null,books, ['getBookTitles'],'someRandom stuff')))
            .toEqual('[object Error]');
    })

    it("can handle code (run-time) errors",function(){
        expect(p.proc(null,books, ['getBookTitles'],'this.result'))
            .toEqual([false]);
    })
    it("can handle invalid queries",function(){
        expect(p.proc(null,books, '$..moviesdd'))
            .toEqual([false]);
    })
    it("can handle parameter type errors",function(){
        expect(p.proc(null,books, '$..movies[?(@.genres.indexOf("Drama")>-1)]'))
            .toEqual([false]);
    })
    it("can handle jsonPath (run-time) errors",function(){
        expect(p.proc(null,books, '$..movies[?(@.genres.indexOf(Drama)>-1)]'))
            .toEqual([false]);
    })
    it("can handle jsonPath (run-time) errors parms string",function(){
        expect(p.proc(null,books, '$..movies[?(@.genres.indexOf(Drama)>-1)]','',{Drama:'"test"'}))
            .toEqual([false]);
    })
    it("can handle jsonPath (run-time) errors parms no string",function(){
        expect(p.proc(null,books, '$..movies[?(@.genres.indexOf(Drama)>-1)]','',{Drama:'test'}))
            .toEqual([false]);
    })
})