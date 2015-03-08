//initialize an empty state
describe("getState",function(){
    var data={movies:[{"title":"test1","genres":["Action","Drama"]},{"title":"test3","genres":["Comedy"]},{"title":"test2","genres":["Romance","Drama"]}]}
    beforeEach(function(){
        p.setState();
    })
    it("returns the current model data",function(){
        var id = 'testid2'
        p({},id)

        expect(p.model()).toEqual( Object({ stores: Object({  }), queries: Object({  }), procs: Object({  }) }))
        expect(p.getState(id)).toEqual(p.model())
    })

    it("works with setState and NO intializer",function(){
        var id = 'testid1'

        p.setState({stores:{tester:{}}}, id)
        expect(p.getState(id)).toEqual( Object({stores: Object({tester: Object({})}), queries: Object({}), procs: Object({})}))
    })

    it("works with setState and an intializer",function(){
        var id = 'testid12'
        p({},id)

        p.setState({stores:{tester:{}}}, id)
        expect(p.getState(id)).toEqual( Object({stores: Object({tester: Object({})}), queries: Object({}), procs: Object({})}))
    })

    it("maintains a global state with no id",function(){
        expect(p.getState()).toEqual(p.model())
    })
    it("can initalize with data",function(){
        // pre defined proc
        p.proc('getTopDramaMovies','movies',"byDrama")
        expect(p.getState()).toEqual(Object({ stores: Object({  }), queries: Object({  }), procs: Object({ getTopDramaMovies: Object({ namedQueries: [ 'byDrama' ] }) }) }))
        // load via ajax
        p({stores:{movies:data},queries:{"byDrama":{store:"movies",query:"$..movies[?(@.genres.indexOf('Drama')>-1)]"}}}) // allows the store to be used elsewhere by other praetors

        //run proc once data loaded
        expect(p.proc('getTopDramaMovies')[0].byDrama.length).toEqual(2)
        //remove the store
        p({stores:{movies:{}}})
        expect(p.getState()).toEqual( Object({ stores: Object({ movies: Object({  }) }), queries: Object({ byDrama: Object({ store: 'movies', query: '$..movies[?(@.genres.indexOf(\'Drama\')>-1)]' }) }), procs: Object({ getTopDramaMovies: Object({ namedQueries: [ 'byDrama' ] }) }) }))
    })
})