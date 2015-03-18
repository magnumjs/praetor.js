parms = require("../../components/parms")


form = function() {

    var module = {}

    module.data = {
        getData: function(data) {
            return {
                name: m.prop(data.name || ''),
                query: m.prop(data.queries || ''),
                code: m.prop(data.code || ''),
                parms: m.prop(data.parms || '')
            }
        },
        //saveList: function(list) {
        //    localStorage['procs'] = JSON.stringify(list)
        //},
        //getList: function() {
        //    return JSON.parse(localStorage['procs'] || '{}')
        //}
    }

    module.controller = function(props) {
        this.mode = props.mode
        this.actions = props.actions
        this.stores = props.storeList

        data = {}
        if (this.mode == 'edit' && props.name) {
            data = p.getStoredProc(props.name)
            data.name = props.name
        }
        this.model = module.data.getData(data)



        this.list = this.actions.getList()

        p({
              procs: this.list
          })

        //both methods require a refresh

        this.remove = function() {
            var update = {
                procs: {}
            }
            update['procs'][this.model.name()] = null
            p(update)
            // update state
            delete this.list[this.model.name()]
            this.actions.saveList(this.list)
        }.bind(this)

        this.save = function() {
            console.log(this.model.query(), this.model.code(), this.model.parms())
            this.list[this.model.name()] = {
                queries: typeof this.model.query() == 'string' ? this.model.query().split(',') : this.model.query(),
                code: this.model.code(),
                parms: this.model.parms()
            }
            this.actions.saveList(this.list)
            p({
                  procs: this.list
              })
            p.proc(this.model.name(), '', this.list[this.model.name()].queries, this.model.code(), this.model.parms());
        }.bind(this)

    }

    module.view = function(ctrl) {
        return m(".form", binds(ctrl.model),
                 ctrl.mode.toUpperCase() + ' PROC - p.proc(procName|null,StoreName|data,jsonPathQueryNames|query(s),/* code, parms, id */)', [
                m("input#name[placeholder='Proc Name']", {
                    value: ctrl.model.name()
                }),
                m("input#query[placeholder='Queries']", {
                    value: ctrl.model.query()
                }),
                m("textarea#code[placeholder='JS Code']", {
                    value: ctrl.model.code()
                }),
                m.module(parms, {
                    parms: ctrl.model.parms
                }),
                m("button", {
                    onclick: ctrl.save
                }, 'Save'),
                ctrl.mode == 'edit' ? m("button", {
                    onclick: ctrl.remove
                }, 'Remove') : ''
            ])
    }
    return module
}

function binds(data) {
    return {
        onchange: function(e) {
            data[e.target.id] ? data[e.target.id](e.target.value) : ''
        }
    }
}

module.exports = form