

var form = function() {

    var module = {}

    module.model={}

    module.model.storeList={default:'select pre-defined stored'}

    module.controller = function(props) {
        this.model = {
            name: m.prop(''),
            query: m.prop(''),
            store: m.prop('')
        }

        this.actions = props.actions
        this.list    = props.list
        this.stores  = props.storeList

        this.storesList = Object.keys(this.stores)
        storesList.unshift(module.model.storeList.default)

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
            'Add query - p.setJsonQuery(queryName, JSONPathQuery, JSONDataStoreName) - (JSONPath syntax)', [
                m('input[placeholder="query name"]', {
                    onchange: m.withAttr("value", ctrl.model.name),
                    value: ctrl.model.name()
                }),
                m('textarea[placeholder="JSONPath Query"]', {
                    onchange: m.withAttr("value", ctrl.model.query),
                    value: ctrl.model.query()
                }),
                getStoreNamesListSelect(ctrl.storesList),
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

function getStoreNamesListSelect(stores){

    return m('select', {},[
         stores.map(function(d, i){
             return m('option', {value : i, innerHTML : d })
         })
     ])
}

module.exports = form