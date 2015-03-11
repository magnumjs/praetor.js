m = require('mithril');
links = require('./components/linknav')
main = require('./main')

var persist = main.persist,
    demo = main.demo,
    utils = main.utils,
    store = main.store,
    dash = main.dash,
    query = main.query

//top level component
var app = {}

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
// init
app.controller = function () {
    persist.init()
    this.id = m.prop(0)
}()

// for the linkmap component
var actionMap = [
    {text: 'Simple Demo', type: demo, link: '/demo'},
    {text: 'API::Create Stores', type: store, link: '/store'},
    {text: 'API::Create Queries', type: query, link: '/query'},
    {text: 'Dashboard Card Demo', type: dash, link: '/dash'},
]

// for the m.route
var routeMessages = {
    'demo': m.module(demo()),
    'store': m.module(store()),
    'query': m.module(query()),
    'dash': m.module(dash()),
    'welcome': welcomeMessage()
}

// layout manager
var layout = {
    selectedIndex: m.prop(0)
}

layout.controller = function () {
    var route = m.route.param("key")
    layout.selectedIndex(utils.getObjectKeyByVal(routeMessages, route));
    this.message = routeMessages[m.route.param("key")]
}

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
                m('button.silver', 'Go'),
                m('a[href="https://github.com/magnumjs/praetor.js"]', 'PraetorJS gitHub')
            ])

    }

    return utils.m.mixinLayout(utils.m.layout, nav, body)();
}

m.route(document.body, '/welcome', {
    "/:key...": layout
})