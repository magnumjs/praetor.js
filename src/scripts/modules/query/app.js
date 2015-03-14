m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")
passFail = require("../../components/pass-fail")
tabbed = require("../../components/tabs")

var list = require('../../modules/query/list')
var form = require('../../modules/query/form')

// query module
var query = function() {


    var module = {
        //model
        data: {
            "selectedItem": "create",
            "tabs": [{
                         "name": "create",
                         "content": form
                     }, {
                         "name": "list",
                         "content": list
                     }]
        },

        controller: function (props) {

            this.data = module.data

            this.actions = persist.model('queries')
            this.list = this.actions.getList()

            // initialize praeter.js
            p({queries:this.list});

            this.data.selectedItem  = props.sub || module.data.selectedItem

            this.changeTab = function(name) {
                this.data.selectedItem = name
                m.route("/"+props.top+"/"+name)
            }.bind(this)

        },

        view: function (ctrl) {
            var options = {
                tabs        : ctrl.data.tabs,
                key         : ctrl.data.selectedItem,
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
    return module;
}

module.exports = query