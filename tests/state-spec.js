//initialize an empty state
describe("getState",function(){


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
})