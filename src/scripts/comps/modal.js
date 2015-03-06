m = require('mithril');


//modal module
var modal = function(options){

    var modal = {};

    modal.visible = m.prop(false);

    function close(){
        return m("button[type=button].close-modal",
                 {onclick: modal.visible.bind(this, false)}, "Close modal")
    }
    function showModal(body){
        return [
            m(".modal",m('.wrapper',[
                  body(),
                  close()
              ])
            )
        ]
    }
    modal.view = function(body) {
        return modal.visible() ? showModal(body) : "";
    };

    return modal;
}

module.exports = modal;