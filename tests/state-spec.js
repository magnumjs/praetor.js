//initialize an empty state
describe("getState",function(){
    var data={movies:[{"title":"test1","genres":["Action","Drama"]},{"title":"test3","genres":["Comedy"]},{"title":"test2","genres":["Romance","Drama"]}]}
    beforeEach(function(){
        p.setState();
    })
    it("returns the current model data",function(){
        var id = 'testid2'

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

        p.setState({stores:{tester:{}}}, id)
        expect(p.getState(id)).toEqual( Object({stores: Object({tester: Object({})}), queries: Object({}), procs: Object({})}))
    })
    it("completely overwrite state on the same node using setState",function(){
        var id = 'testid123'

        p.setState({stores:{tester:{}}}, id)
        p.setState({stores:{tester2:{}}}, id)

        expect(p.getState(id)).toEqual(Object({ stores: Object({ tester2: Object({  }) }), queries: Object({  }), procs: Object({  }) }))
    })
    it("merges state on the same node using p()",function(){
        var id = 'testid123'

        p({stores:{tester:{}}}, id)
        p({stores:{tester2:{}}}, id)

        expect(p.getState(id)).toEqual(Object({ stores: Object({ tester2: Object({  }), tester: Object({  }) }), queries: Object({  }), procs: Object({  }) }))
    })


    it("add proc to state and remove it from p and p.setState",function(){
        var id = 'testid1234'

        p({procs:{tester:{queries:'1',code:'2',parms:"3"}}}, id)

        expect(p.getState(id)).toEqual(Object({ stores: Object({  }), queries: Object({  }), procs: Object({ tester: Object({ queries: '1', code: '2', parms: '3' }) }) }))
        p({procs:{tester2:{queries:'1',code:'2',parms:"3"}}}, id)

        p({procs:{tester:null}}, id)
        expect(p.getState(id)).toEqual(Object({ stores: Object({  }), queries: Object({  }), procs: Object({ tester2: Object({ queries: '1', code: '2', parms: '3' }) }) }))

        p.setState({procs:{tester:null}}, id)
        expect(p.getState(id)).toEqual(Object({ procs: Object({ tester: null }), stores: Object({  }), queries: Object({  }) }))

    })

    it("merges state on the same node using p()",function(){
        var id = 'testid1233'

        p({stores:{tester:{attr:true}}}, id)
        expect(p.getState(id).stores.tester.attr).toEqual(true)

        p({stores:{tester:{attr:false}}}, id)

        expect(p.getState(id).stores.tester.attr).toEqual(false)
    })

    it("maintains a global state with no id",function(){
        expect(p.getState()).toEqual(p.model())
    })
    it("can initalize with data",function(){
        // pre defined proc
        p.proc('getTopDramaMovies','movies',"byDrama")
        expect(p.getState()).toEqual(Object({ stores: Object({  }), queries: Object({  }), procs: Object({ getTopDramaMovies: Object({ queries: [ 'byDrama' ] }) }) }))
        // load via ajax
        p({stores:{movies:data},queries:{"byDrama":{store:"movies",query:"$..movies[?(@.genres.indexOf('Drama')>-1)]"}}}) // allows the store to be used elsewhere by other praetors

        //run proc once data loaded
        expect(p.proc({name:'getTopDramaMovies'})[0].byDrama.length).toEqual(2)
        //remove the store
        //p.emptyDataStore('movies')
        p({stores:{movies:{movies:null}}})
        expect(p.getState()).toEqual( Object({ stores: Object({ movies: Object({  }) }), queries: Object({ byDrama: Object({ store: 'movies', query: '$..movies[?(@.genres.indexOf(\'Drama\')>-1)]' }) }), procs: Object({ getTopDramaMovies: Object({ queries: [ 'byDrama' ] }) }) }))
    })
})