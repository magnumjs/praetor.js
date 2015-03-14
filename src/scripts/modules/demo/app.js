m = require('mithril');
tabbed = require("../../components/tabs")
stateFun = require("../../components/state-fun")
utils = require('../../utils')
books = require('../../../data/books')

var list = require('../../modules/demo/list')
var form = require('../../modules/demo/form')

// app demo/p.proc module
var demo = function () {

    var tabs = {
        //model
        data: {
            "selectedItem": "create",
            "tabs": [{
                         "name": "create",
                         "content": form
                     }, {
                         "name": "results",
                         "content": list
                     },
                     {
                         "name": "state",
                         "content": stateFun
                     }]
        },
        //controller
        controller: function (props) {

            this.data = tabs.data

            this.list = m.prop( (props.state().demoresults || []).list)
            this.code = m.prop( (props.state().demoresults || {}).code)
            this.state = m.prop({})

            this.data.selectedItem  = props.sub || tabs.data.selectedItem

            this.changeTab = function (name) {
                this.data.selectedItem = name
                // save list and code to localstorage for retrieval by results
                props.state({demoresults:{list:this.list(),code:this.code()}})

                // results id to match ?
                m.route("/"+props.top+"/"+name)
            }.bind(this)

        },
        //view
        view: function (ctrl) {
            var options = {
                tabs        : ctrl.data.tabs,
                key         : ctrl.data.selectedItem,
                changeTab   : ctrl.changeTab
            }

            return m("div", {},
                     m.module(tabbed, options, {
                         state: ctrl.state,
                         list: ctrl.list,
                         code: ctrl.code,
                         actions: ctrl.actions,
                         changeTab: ctrl.changeTab
                     })
            )
        }
    }
    return tabs
}

module.exports = demo