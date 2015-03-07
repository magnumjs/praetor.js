

var form = function() {

    var module = {}

    module.controller = function(props) {
        this.model = {
            name: m.prop(''),
            store: m.prop('')
        }

        this.actions = props.actions
        this.list    = props.list
        this.pass    = m.prop("")
        this.fail    = m.prop("")

        this.save = function() {
            if(this.model.name() && this.model.store()){
                this.list[this.model.name()] = this.model.store()
                this.actions.saveList(this.list);
                p.setDataStore(this.model.name(), JSON.parse(this.model.store()))
            } else {
                this.fail(true)
            }
        }.bind(this)
    }

    module.view = function(ctrl) {
        return m('.form', [
            m.module(passFail(),{
                pass:ctrl.pass,fail:ctrl.fail,message:{pass:"yay!", fail:"boo!"}
            }),
            'Add store - p.setDataStore(storeName, JSONData)', [
                m('input[placeholder="store name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('textarea[placeholder="JSON data"]', {
                    onchange: m.withAttr("value", ctrl.model.store),
                    value: ctrl.model.store()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Add")
            ]
        ])
    }
    return module
}

module.exports = form