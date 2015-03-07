

var form = function() {

    var module = {}

    module.controller = function(props) {
        this.model = {
            name: m.prop(''),
            query: m.prop(''),
            store: m.prop('')
        }

        this.actions = props.actions
        this.list    = props.list

        this.pass    = m.prop("")
        this.fail    = m.prop("")

        this.save = function() {
            if(this.model.name() && this.model.store() && this.model.query()){

                this.list[this.model.name()] = {
                    query: this.model.query(),
                    store: this.model.store()
                }
                this.actions.saveList(this.list);
                p.setJsonQuery(this.model.name(), this.model.query(), this.model.store());

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
            'Add query (JSONPath syntax)', [
                m('input[placeholder="query name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('textarea[placeholder="JSONPath Query"]', {
                    onchange: m.withAttr("value", ctrl.model.query),
                    value: ctrl.model.query()
                }),
                m('input[placeholder="JSON store name"]', {
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