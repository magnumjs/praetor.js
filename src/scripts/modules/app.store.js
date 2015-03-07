m = require('mithril');
p = require("praetor")
app = require("../modules/app-modules.js")
passFail = require("../components/pass-fail")
tabbed = require("../components/tabs")

var app = app || {}
// app store module
app.store=function(){

    var tabs = {
        //model
        data: {
            "selectedItem": "create",
            "tabs": [{
                         "name": "create",
                         "content": app.store.form
                     }, {
                         "name": "list",
                         "content": app.store.list
                     }]
        },
        //controller
        controller: function() {
            this.data = tabs.data

            this.actions = app.data.model('stores')
            this.list = this.actions.getList()

            // initialize praeter.js
            p({stores:this.list});

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
                         list    : ctrl.list,
                         actions : ctrl.actions
                     })
            )
        }
    }
    return tabs
}
app.store.form = function() {

    var module = {}

    module.controller = function(props) {
        this.model = {
            name: m.prop(''),
            store: m.prop('')
        }

        this.actions = props.actions
        this.list    = props.list
        this.pass    = m.prop("")
        this.fail    = m.prop("")

        this.save = function() {
            if(this.model.name() && this.model.store()){
                this.list[this.model.name()] = this.model.store()
                this.actions.saveList(this.list);
                p.setDataStore(this.model.name(), JSON.parse(this.model.store()))
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
            'Add store', [
                m('input[placeholder="store name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('textarea[placeholder="JSON data"]', {
                    onchange: m.withAttr("value", ctrl.model.store),
                    value: ctrl.model.store()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Add")
            ]
        ])
    }
    return module
}

app.store.list = function() {
    var module = {}

    module.controller = function(props) {
        this.stores = p.getState().stores
        this.title = 'Stores'
        this.showJson=false
        this.showHide=function(name){
            this.showJson=this.showJson==name?0:name
        }.bind(this)
    }
    module.view = function(ctrl, state) {
        return m('ul.store-list',
                 {},
                 m('h3',ctrl.title),
                 Object.keys(state.list).map(function(name) {
                     var json = state.list[name]
                     return m("li",{title:json, onclick:ctrl.showHide.bind(this,name)}, name,
                              ctrl.showJson==name?m('textarea.json',json):'')
                 })
        )
    }
    return module
}

module.exports = app.store