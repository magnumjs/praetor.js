m = require('mithril');
modal = require('./comps/modal')
app = require('./comps/app-modules')
demo = require('./comps/demo')

//top level component

app.controller = function() {
    this.modal = new modal();
}

function mapActions(ctrl){
    var actionMap =[
        { text : 'Simple Demo', type:demo.demo},
        { text : 'Create a stateful map of stores', type:app.store},
        // { text : 'Create named JSONPath queries on those stores', type:'query'},
        // { text : 'Create named pure JS code Blocks with named queried results', type:'proc'},
        // { text : 'Get the state & set the state', type:'state'}
    ];
    return [
        m('ol',
          actionMap.map(function(obj, idx){
              return m('li',{key:idx},
                       m('a.action',{
                             onclick:function(type, e){
                                 ctrl.type=type;
                                 ctrl.modal.visible(true)
                             }.bind(this,obj.type)}
                           ,obj.text))
          })
        )
    ]
}

app.view = function(ctrl) {
    return m(".container", [
        m('h2','Praetor Editor Mithril!'),
        m('h3','JSON Path Stored Procedures'),
        mapActions(ctrl),
        ctrl.modal.view(function() {
            return m("p.content", ctrl.type())
        }),
        m('a[href="https://github.com/magnumjs/praetor.js"]','PraetorJS gitHub')
    ])
}

m.module(document.body, app)