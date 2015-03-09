describe("praetor queries",function(){


    var data={movies:[{"title":"test1","genres":["Action","Drama"]},{"title":"test3","genres":["Comedy"]},{"title":"test2","genres":["Romance","Drama"]}]}
    beforeEach(function(){
        p.setState();
    })
    it("caches the same query with same parms",function(){
        p.setDataStore('movies', data)
        p.setJsonQuery('test','$..movies[*][?(@.genres.indexOf(PARM)>-1)]','movies')
       var r = p.getJsonQueryResult('test',{PARM:'"Drama"'})
        var r = p.getJsonQueryResult('test',{PARM:'"Drama"'})

        expect(r).toEqual([ 'test1', [ 'Action', 'Drama' ], 'test2', [ 'Romance', 'Drama' ] ] )
    });
    it("returns the current model data",function(){
        var id = 'testid2'

        expect(p.model()).toEqual( Object({ stores: Object({  }), queries: Object({  }), procs: Object({  }) }))
        expect(p.getState(id)).toEqual(p.model())
    })
    it("returns results",function() {

        // define
        p.proc('getTopDramaMovies','movies',"byDrama")

        // inflate
        p({stores:{movies:data},queries:{"byDrama":{store:"movies",query:"$..movies[?(@.genres.indexOf(PARM)>-1)]"}}}) // allows the store to be used elsewhere by other praetors

        // run
        expect(p.proc({name:'getTopDramaMovies', parms:{PARM:'"Drama"'}})[0].byDrama.length).toEqual(2)
    });

})