

module.exports = function(){
    var module = {}

    module.controller = function(props) {
        this.state = p.getState()
    }
    module.view = function(ctrl, state) {
        return m('.state',
                 Object.keys(ctrl.state).map(function(name, idx) {
                     var json  =JSON.stringify(ctrl.state[name])
                     return m("li",{title:json}, name,
                              m('textarea.json',json))
                 })
        )
    }
    return module

}