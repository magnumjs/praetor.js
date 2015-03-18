
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
                      m('.step',m('h1','1. Define'),m('code',"p.proc (\n'getTopDramaMovies',\n'movies',\n'byDrama'\n)")),
                      m('.step',m('h1','2. Inflate'),m('code',"p (\n{stores:{movies:data},\nqueries:{\n'byDrama':{store:'movies',\nquery:'$..movies[?(@.genres.indexOf(PARM)>-1)]'}}}\n)")),
                      m('.step',m('h1','3. Run'),m('code',"p.proc (\n{name:'getTopDramaMovies', parms:{PARM:'Drama'}}\n)[0].byDrama.length"))
                  ])
              ]
            )
        ])
    }

    return module
}

module.exports = app