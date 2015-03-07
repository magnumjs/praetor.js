m = require('mithril');
p = require("praetor")
app = require("../modules/app-modules.js")
passFail = require("../components/pass-fail")
tabbed = require("../components/tabs")

var app = app || {}


// query module
app.query = function() {

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

module.exports = app.query