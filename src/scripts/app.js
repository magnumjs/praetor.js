m = require('mithril');
modal = require('./components/modal')
main = require('./main')

var persist  = main.persist,
    demo     = main.demo,
    store    = main.store,
    dash     = main.dash,
    query    = main.query

//top level component
var app ={}
app.welcomeMessage=m('.content',[
    m('.panel','Welcome to the PraetorJS administration editor demo page!',[
        m('p','We will walk through some simple examples to demonstrate the way you can create and recall procedures'),
        m('p','Check out the tools in the menu to the left.'),
        m('a[href="http://goessner.net/articles/JsonPath/"]','JSONPath reference to create queries.')
    ])
]);
app.controller = function() {
    persist.init()
    this.id = m.prop(0)



}
var actionMap =[
    { text : 'Simple Demo', type:demo, link:'/demo'},
    { text : 'API::Create Stores', type:store, link:'/store'},
    { text : 'API::Create Queries', type:query, link:'/query'},
    { text : 'Dashboard Card Demo', type:dash, link:'/dash'},

    // { text : 'Create named pure JS code Blocks with named queried results', type:'proc'},
    // { text : 'Get the state & set the state', type:'state'}
]

function mapActions(ctrl, options){
    var style = (options || {}).style
    //var actionMap =[
    //    { text : 'Simple Demo', type:demo, link:'/demo'},
    //    { text : 'API::Create Stores', type:store, link:'/store'},
    //    { text : 'API::Create Queries', type:query, link:'/query'},
    //    { text : 'Dashboard Card Demo', type:dash, link:'/dash'},
    //
    //    // { text : 'Create named pure JS code Blocks with named queried results', type:'proc'},
    //    // { text : 'Get the state & set the state', type:'state'}
    //]


    ctrl.onchange=function(){
       // ctrl.type=actionMap[ctrl.id()].type
console.log(ctrl)
      //  console.log(actionMap[ctrl.id()].link)
    }

    if(style=='select'){

        return m('select.silver', {onchange: function () {
            ctrl.id(this.selectedIndex)
           // ctrl.type = actionMap[ctrl.id()].type
            m.route(actionMap[this.selectedIndex].link)
        }},[
            actionMap.map(function(d, i){
                return m('option', {config: m.route, value : i, innerHTML : d.text })
            })
        ])

    } else {

        return [
            m('ol',
              actionMap.map(function (obj, idx) {
                  return m('li', {key: idx},
                       m('a.action', {
                         onclick: function (type, e) {
                             ctrl.type = type
                             ctrl.id(idx)
                         }.bind(this, obj.type)
                     }
               , obj.text))
              })
            )
        ]
    }
}

app.view = function(ctrl) {
    return m(".container", [
        m('.nav',[
            m('.welcome',[
                m('h1','Praetor Admin Editor'),
                m('h3',{title:"reference procs to manipulate data in pre-determined ways"},'JSON Path Stored Procedures'),
                mapActions(ctrl,{style:'select'}),
                m('button.silver',{onclick:ctrl.onchange},'Go'),
                m('a[href="https://github.com/magnumjs/praetor.js"]','PraetorJS gitHub')
            ])
        ]),
        //ctrl.type ? m("p.content",{key:ctrl.id()}, ctrl.type()):
        m("p.content",{config:function(ele){
            m.route(ele,'/welcome', {
                "/welcome": {
                    controller: function() {},
                    view: function() {
                        return ctrl.welcomeMessage
                    }
                },
                "/demo": demo(),
                "/dashboard": dash()
            });
        }}, ctrl.welcomeMessage )
    ])
}


var layout ={
    call : m.prop( true ),
    id : m.prop(0)
}

var routeMessages = {
    'welcome' : app.welcomeMessage,
    'demo'    : m.module(demo()),
    'dash'    : m.module(dash()),
    'store'    : m.module(store()),
    'query'    : m.module(query())
}



function menu(ctrl){
    return m('select', {onchange: function () {
        ctrl.id(this.selectedIndex)
        m.route(actionMap[this.selectedIndex].link)
    }},[
                 actionMap.map(function(d, i){
                     return m('option', {config: m.route, value : i, innerHTML : d.text })
                 })
             ])

}

layout.view = function(ctrl) {
    layout.call(!layout.call())
//    return m(".container", [
//        m('a.nav',{
//            config : m.route,
//            href   :  layout.call(!layout.call()) ? "/welcome" : "/demo"
//        },'CLICK ME!'),
//        m("p.content", ctrl.message )
//    ])

   // console.log( layout.call())

    return m(".container", [
        m('.nav',[
            m('.welcome',[
                m('h1','Praetor Admin Editor'),
                m('h3',{title:"reference procs to manipulate data in pre-determined ways"},'JSON Path Stored Procedures'),
               mapActions(layout,{style:'select'}),
                //menu(layout),
                m('button.silver',{onclick:ctrl.onchange},'Go'),
                m('a[href="https://github.com/magnumjs/praetor.js"]','PraetorJS gitHub')
            ])
        ]),
        m("p.content",{key:layout.id()}, ctrl.message )
    ])


}

m.route(document.body, '/welcome', {
    "/:key...": {
        controller : function(){
            console.log(m.route.param( "key" ) )
            this.message = routeMessages[ m.route.param( "key" ) ]

        },
        view : layout.view
    }
})

//m.module(document.body, app)