m = require('mithril');
modal = require('./components/modal')
app = require('./modules/app-modules')
demo = require('./modules/demo')

//top level component

app.controller = function() {
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
        { text : 'Simple Demo', type:demo.demo},
        { text : 'Create a stateful map of stores', type:app.store},
        // { text : 'Create named JSONPath queries on those stores', type:'query'},
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
        ctrl.type ? m("p.content",{key:ctrl.id()}, ctrl.type()):ctrl.welcomeMessage
    ])
}

m.module(document.body, app)