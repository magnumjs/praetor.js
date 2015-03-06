m = require('mithril');
p = require("praetor")
passFail = require("./pass-fail")
tabbed = require("./tabs")

var app = app || {}
app.forms = {}
app.data = {}

app.data.init = function() {
    //load all from state
    var data = ['stores', 'queries', 'procs'];
    var map = {};
    data.forEach(function(val, idx) {
        map[val] = localStorage[val] ? JSON.parse(localStorage[val]) : {};
        if (val == 'stores') {
            for (k in map[val])
                map[val][k] = JSON.parse(map[val][k])
        }
    });
    p.setState(map);
    console.log('state set')
}();

app.data.model = function(name) {
    return {
        saveList: function(list) {
            localStorage[name] = JSON.stringify(list)
        },
        getList: function() {
            return JSON.parse(localStorage[name] || '{}')
        }
    }
}

//app modules

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

// query module
app.forms.query = function() {

    var module = {}

    module.controller = function() {

        this.model = {
            name: m.prop(''),
            query: m.prop(''),
            store: m.prop('')
        };
        this.list = module.model.getList();

        this.save = function() {
            this.list[this.model.name()] = {
                query: this.model.query(),
                store: this.model.store()
            }
            module.model.saveList(this.list);
            p.setJsonQuery(this.model.name(), this.model.query(), this.model.store());
        }.bind(this);

    }

    module.model = {
        saveList: function(list) {
            localStorage['queries'] = JSON.stringify(list);
        },
        getList: function() {
            return JSON.parse(localStorage['queries'] || '{}');
        }
    }

    module.view = function(ctrl) {
        return m('.form', [
            'Add query', [
                m('input[placeholder="query name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('textarea[placeholder="JSONPath Query"]', {
                    onchange: m.withAttr("value", ctrl.model.query),
                    value: ctrl.model.query()
                }),
                m('input[placeholder="JSON store name"]', {
                    onchange: m.withAttr("value", ctrl.model.store),
                    value: ctrl.model.store()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Add")
            ]
        ])
    }
    return module;

}
app.forms.proc = function() {

    var module = {}

    module.controller = function() {

        this.model = {
            name: m.prop(''),
            query: m.prop(''),
            code: m.prop('')
        };
        this.list = module.model.getList();

        this.save = function() {
            this.list[this.model.name()] = {
                query: this.model.query(),
                store: this.model.code()
            }
            module.model.saveList(this.list);
            p.setStoredProc(this.model.name(), this.model.query().split(','), this.model.code());
        }.bind(this);

    }

    module.model = {
        saveList: function(list) {
            localStorage['procs'] = JSON.stringify(list);
        },
        getList: function() {
            return JSON.parse(localStorage['procs'] || '{}');
        }
    }

    module.view = function(ctrl) {
        return m('.form', [
            'Add proc', [
                m('input[placeholder="Proc Name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('input[placeholder="JSON Query Names (comma separated)"]', {
                    onchange: m.withAttr("value", ctrl.model.query),
                    value: ctrl.model.query()
                }),
                m('textarea[placeholder="JavaScript Code: this.results & this.params"]', {
                    onchange: m.withAttr("value", ctrl.model.code),
                    value: ctrl.model.code()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Add")
            ]
        ])
    }
    return module;
}

app.forms.state = function() {
    return [
        m('.form', [
            'Add State'
        ])
    ]
}

module.exports = app;