m = require('mithril');
p = require("praetor")
passFail = require("../components/pass-fail")
tabbed = require("../components/tabs")

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