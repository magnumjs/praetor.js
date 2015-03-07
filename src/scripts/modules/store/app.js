// app store module

m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")
passFail = require("../../components/pass-fail")
tabbed = require("../../components/tabs")
books = require('../../../data/books')

var list = require('../../modules/store/list')
var form = require('../../modules/store/form')


//app.booksString = JSON.stringify(books);
//app.books = JSON.parse(app.booksString);

var store=function(){

    var tabs = {
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
        //controller
        controller: function() {
            this.data = tabs.data

            this.actions = persist.model('stores')
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

module.exports = store