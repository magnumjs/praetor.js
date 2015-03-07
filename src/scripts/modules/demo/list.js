

var results = function() {
    var module = {}

    module.controller = function(props) {
        this.setArea=function(element, isInit, context){
            utils.resizeTextarea(element.id)
        }
    }
    module.view = function(ctrl, state) {
        return m('.results',[
            m('textarea#list',{config:ctrl.setArea},JSON.stringify(state.list())),
            m('textarea#code',{config:ctrl.setArea},state.code()),
        ])
    }
    return module
}

module.exports = results