m = require('mithril');
links = require('./components/linknav')
main = require('./main')

var persist = main.persist,
    demo = main.demo,
    utils = main.utils,
    store = main.store,
    dash = main.dash,
    query = main.query

// actually a module but content module?
var welcomeMessage = function () {
    return m('.content', [
        m('.panel', 'Welcome to the PraetorJS administration editor demo page!',
          [
              m('p',
                'We will walk through some simple examples to demonstrate the way you can create and recall procedures'),
              m('p', 'Check out the tools in the menu to the left.'),
              m('a[href="http://goessner.net/articles/JsonPath/"]',
                'JSONPath reference to create queries.')
          ]
        )
    ])
}

// for the linkmap component
// use by the layout nav
var actionMap = [
    {text: 'Welcome page', type: welcomeMessage, link: '/welcome'},
    {text: 'Simple Demo', type: demo, link: '/demo'},
    {text: 'API::Create Stores', type: store, link: '/store'},
    {text: 'API::Create Queries', type: query, link: '/query'},
    {text: 'Dashboard Card Demo', type: dash, link: '/dash'},
]

//top level component
var app = {}

// init
app.controller = function () {
    persist.init()
    this.id = m.prop(0)
}()


// for the m.route
// used by layout controller
var routeMessages = {
    'welcome': welcomeMessage(),
    'demo': m.module(demo()),
    'store': m.module(store()),
    'query': m.module(query()),
    'dash': m.module(dash())
}

// layout manager
var layout = {
    selectedIndex: m.prop(0)
}

// sets the routes module
layout.controller = function () {
    var route = m.route.param("key")
    layout.selectedIndex(utils.getObjectKeyByVal(routeMessages, route));
    this.message = routeMessages[m.route.param("key")]
}

// returns the top level layout
layout.view = function (ctrl) {

    var body = function () {
        return m("section", {key: layout.selectedIndex()}, ctrl.message)
    }

    var nav = function () {
        return  m('.welcome', [
                m('h1', 'Praetor Admin Editor'),
                m('h3', {title: "reference procs to manipulate data in pre-determined ways"},
                  'JSON Path Stored Procedures'),
                links({linkMap: actionMap, style: 'select', selectedIndex: layout.selectedIndex}),
                m('button.silver', {onclick:function(){
                    // necessary?
                    m.route(actionMap[layout.selectedIndex()].link)
                }},'Go'),
                m('a[href="https://github.com/magnumjs/praetor.js"]', 'PraetorJS gitHub')
            ])

    }
    return utils.m.mixinLayout(utils.m.layout, nav, body)();
}

m.route(document.body, '/welcome', {
    "/:key...": layout
})