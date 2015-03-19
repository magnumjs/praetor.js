m = require('mithril');
links = require('./components/linknav')
main = require('./main')

var persist = main.persist,
    getPage = main.getPage,
    utils = main.utils

// for the linkmap component
// use by the layout nav
var actionMap = [
    {text: 'Welcome page', link: '/welcome'},
    {text: 'Simple Demo', link: '/demo'},
    {text: 'API::Create Stores', link: '/store'},
    {text: 'API::Create Queries', link: '/query'},
    {text: 'API::Create Procs', link: '/proc'},
    {text: 'Dashboard Card Demo', link: '/dash'},
]

//top level component
var app = {
    state: m.prop({})
}

// init
app.controller = function () {
    persist.init()
    this.id = m.prop(0)
}()

// layout manager
var layout = {
    selectedIndex: m.prop(0)
}

// sets the routes module
layout.controller = function () {
    var route = m.route.param("key")
    var sub = m.route.param("sub")

    actionMap.forEach(function (item, idx) {
        return item.link == "/" + route ? layout.selectedIndex(idx) : null
    })

    getPage(actionMap[layout.selectedIndex()].link, function (name, mod) {
        this.message = m.module(mod(), {top: route, sub: sub, state: app.state})
        m.redraw()
    }.bind(this))

}

// returns the top level layout
layout.view = function (ctrl) {

    var body = function () {
        return m("section", {key: layout.selectedIndex()}, ctrl.message)
    }

    var nav = function () {
        return m('.welcome', [
            m('h1', 'Praetor Admin Editor'),
            m('h3', {title: "reference procs to manipulate data in pre-determined ways"},
              'JSON Path Stored Procedures'),
            links({linkMap: actionMap, style: 'select', selectedIndex: layout.selectedIndex}),
            m('button.silver', {
                onclick: function () {
                    // necessary?
                    m.route(actionMap[layout.selectedIndex()].link)
                }
            }, 'Go'),
            m('a[href="https://github.com/magnumjs/praetor.js"]', 'PraetorJS gitHub')
        ])
    }
    return utils.m.mixinLayout(utils.m.layout, nav, body)();
}

m.route(document.body, '/welcome', {
    "/:key": layout,
    "/:key/:sub": layout
})