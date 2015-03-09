m = require('mithril');
tabbed = require("../../components/tabs")
utils = require('../../utils')
books = require('../../../data/books')

var list = require('../../modules/demo/list')
var form = require('../../modules/demo/form')


// app demo/p.proc module
var demo=function(){

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
                     }]
        },
        //controller
        controller: function() {
            console.log(arguments)
            this.data = tabs.data

            this.list = m.prop([])
            this.code = m.prop("")
            this.state = m.prop({})


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
                         state       : ctrl.state,
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

module.exports = demo