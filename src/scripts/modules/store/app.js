// app store module

m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")
passFail = require("../../components/pass-fail")
tabbed = require("../../components/tabs")
books = require('../../../data/books')

var list = require('../../modules/store/list')
var form = require('../../modules/store/form')

var store=function(){

    var module = {}

            //model
        var data = {
            "selectedItem": "create",
            "tabs": [{
                         "name": "create",
                         "content": form
                     }, {
                         "name": "list",
                         "content": list
                     }]
        }

        //controller
        module.controller= function(props) {
            this.data = data

            this.actions = persist.model('stores')
            this.list = this.actions.getList()

            // initialize praeter.js
            p({stores:this.list});

            this.data.selectedItem  = props.sub || data.selectedItem

            this.changeTab = function(name) {
                this.data.selectedItem = name
                m.route("/"+props.top+"/"+name)
            }.bind(this)

        }
        //view
        module.view=function(ctrl) {
            var options = {
                tabs        : ctrl.data.tabs,
                key         : ctrl.data.selectedItem,
                changeTab   : ctrl.changeTab
            }

            return m("div", { },
                 m.module(tabbed, options, {
                     list    : ctrl.list,
                     actions : ctrl.actions
                 })
            )
        }

    return module
}

module.exports = store