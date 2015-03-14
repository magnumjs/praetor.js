

var list = function() {
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

module.exports = list