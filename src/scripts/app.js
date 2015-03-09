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
app.controller = function() {
    persist.init()
    this.id = m.prop(0)
    this.welcomeMessage=m('.content',[
      m('.panel','Welcome to the PraetorJS administration editor demo page!',[
        m('p','We will walk through some simple examples to demonstrate the way you can create and recall procedures'),
        m('p','Check out the tools in the menu to the left.'),
        m('a[href="http://goessner.net/articles/JsonPath/"]','JSONPath reference to create queries.')
        ])
    ]);


}

function mapActions(ctrl, options){
    var style = (options || {}).style
    var actionMap =[
        { text : 'Simple Demo', type:demo},
        { text : 'API::Create Stores', type:store},
        { text : 'API::Create Queries', type:query},
        { text : 'Dashboard Card Demo', type:dash},

        // { text : 'Create named pure JS code Blocks with named queried results', type:'proc'},
        // { text : 'Get the state & set the state', type:'state'}
    ]


    ctrl.onchange=function(){
        ctrl.type=actionMap[ctrl.id()].type
    }

    if(style=='select'){

        return m('select.silver', {onchange: function () {
            ctrl.id(this.selectedIndex)
            ctrl.type = actionMap[ctrl.id()].type
        }},[
            actionMap.map(function(d, i){
                return m('option', { value : i, innerHTML : d.text })
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



m.module(document.body, app)