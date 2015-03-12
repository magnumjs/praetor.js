

var list = function() {
    var module = {name:'queries'}

    module.controller = function(props) {
        this[module.name] = p.getState()[module.name]
        this.title = module.name

        this.showJson=false
        this.showHide=function(name){
            this.showJson=this.showJson==name?0:name
        }.bind(this)
    }
    module.view = function(ctrl, state) {
        return m('ul.'+module.name+'-list',
         {},
         m('h3',ctrl.title),
         Object.keys(state.list).map(function(name, idx) {

             var temp = {}
             temp[name] = state.list[name]
             var json = JSON.stringify(temp )

             return m("li",{title:json, onclick:ctrl.showHide.bind(this,name)}, name,
                      ctrl.showJson==name?m('textarea.json',json):'')
         })
        )
    }
    return module
}

module.exports = list