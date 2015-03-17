
var app = function() {

    var module = {}
    module.controller = function () {
    }
    module.view = function () {

        return m('.content', [
            m('.panel', 'Welcome to the PraetorJS administration editor demo page!',
              [
                  m('p',
                    'We will walk through some simple examples to demonstrate the way you can create and recall procedures'),
                  m('p', 'Check out the tools in the menu to the left.'),
                  m('a[href="http://goessner.net/articles/JsonPath/"]',
                    'JSONPath reference to create queries.'),
                  m('.row',{style:'padding-top:20px'},[
                      m('.step',m('h1','1. Define'),m('code','p.proc("getTopDramaMovies","movies","byDrama")')),
                      m('.step',m('h1','2. Inflate'),m('code','p({stores:{movies:data},queries:{"byDrama":{store:"movies",query:"$..movies[?(@.genres.indexOf(PARM)>-1)]"}}}) // allows the store to be used elsewhere by other praetors')),
                      m('.step',m('h1','3. Run'),m('code','p.proc({name:"getTopDramaMovies", parms:{PARM:"Drama"}})[0].byDrama.length'))
                  ])
              ]
            )
        ])
    }

    return module
}

module.exports = app