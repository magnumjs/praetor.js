m = require('mithril');
tabbed = require("./tabs")


var app = {}

app.booksString = '{"books":[{"title":"kids", "author":"adams"},{"title":"action", "author":"johns"}]}';
app.books = JSON.parse(app.booksString);

// app demo/p.proc module
app.demo=function(){

    var tabs = {
        //model
        data: {
            "selectedItem": "create",
            "tabs": [{
                         "name": "create",
                         "content": app.demo.form
                     }, {
                         "name": "results",
                         "content": app.demo.results
                     }]
        },
        //controller
        controller: function() {
            this.data = tabs.data

            this.list = m.prop([])
            this.code = m.prop("")

            this.changeTab = function(name) {
                this.data.selectedItem = name
            }.bind(this)

        },
        //view
        view: function(ctrl) {
            var options = {
                tabs        : ctrl.data.tabs,
                selectedItem: ctrl.data.selectedItem,
                changeTab   : ctrl.changeTab
            }

            return m("div", {
                     },
                     m.module(tabbed, options, {
                         list        : ctrl.list,
                         code        : ctrl.code,
                         actions     : ctrl.actions,
                         changeTab   : ctrl.changeTab
                     })
            )
        }
    }
    return tabs
}
app.demo.form = function() {

    var module = {}

    module.controller = function(props) {
        this.model = {
            store   : m.prop(''),
            queries : m.prop(''),
            code    : m.prop('')
        }

        this.results = m.prop("")
        this.pass    = m.prop("")
        this.fail    = m.prop("")

        this.prefill=function(){
            this.model.store(app.booksString)
            this.model.queries('$..title')
            this.model.code('this.results[0].reverse()')
        }.bind(this)

        this.save = function() {
            if(this.model.store() && this.model.queries() && this.model.code()){
                this.results(p.proc(JSON.parse(this.model.store()),this.model.queries().split(','), this.model.code()))
                this.pass(true)
                props.code('p.proc('+this.model.store()+',\''+this.model.queries().split(',')+'\', \''+this.model.code()+'\')')
                props.list(this.results)
                props.changeTab("results")
            } else {
                this.fail(true)
            }
        }.bind(this)
    }

    module.view = function(ctrl) {
        return m('.form', [
            m.module(passFail(),{
                pass:ctrl.pass,fail:ctrl.fail,message:{pass:"yay!", fail:"boo!"}
            }),
            'Run p.proc(store,queries,code)', [
                m('button.warning',{onclick:ctrl.prefill},'pre-fill sample'),
                m('textarea[placeholder="JSON data"]', {
                    onchange: m.withAttr("value", ctrl.model.store),
                    value: ctrl.model.store()
                }),
                m('input[placeholder="JSONPath queries (comma separated)"]', {
                    onchange: m.withAttr("value", ctrl.model.queries),
                    value: ctrl.model.queries()
                }),
                m('textarea[placeholder="JS Code Procedure block (this.results array)"]', {
                    onchange: m.withAttr("value", ctrl.model.code),
                    value: ctrl.model.code()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Run")
            ]
        ])
    }
    return module
}

app.demo.results = function() {
    var module = {}

    module.controller = function(props) {
    }
    module.view = function(ctrl, state) {
        return m('.results',[
            m('textarea',JSON.stringify(state.list())),
            m('textarea',state.code()),
        ])
    }
    return module
}

module.exports = app