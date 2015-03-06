m = require('mithril');

var passFail = function(options){

    var passFail = {}

    passFail.model={
        elementType : 'button',
        className   : '.messages'
    }

    passFail.controller = function (props){
        this.elementType = props.elementType ? props.elementType : passFail.model.elementType
        this.className   = props.className ? props.className :passFail.model.className
        this.message     = props.message
        this.pass        = props.pass
        this.fail        = props.fail
    }
    passFail.view = function (ctrl, state){
        var message   = ctrl.pass() ? ctrl.message.pass : ctrl.fail() ?ctrl.message.fail : ""
        var className = ctrl.pass() ?'success':'error'
        return message?m(ctrl.elementType+ctrl.className,
                         { class : className}, message ):m('')
    }

    return passFail
}

module.exports = passFail