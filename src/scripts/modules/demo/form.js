

var form = function() {

    var data={}
    data.booksString = JSON.stringify(books);
    data.books = JSON.parse(data.booksString);

    var module = {name:'demo-form'}

    module.controller = function(props) {
        this.model =props.state()[module.name] || {
            store   : m.prop(''),
            queries : m.prop(''),
            code    : m.prop('')
        }

        props.state({'demo-form':this.model});

        this.results = m.prop("")
        this.pass    = m.prop("")
        this.fail    = m.prop("")

        this.prefill=function(){
            this.model.store(data.booksString)
            this.model.queries('$..title')
            this.model.code('this.results[0].reverse()')
        }.bind(this)

        this.save = function() {
            if(this.model.store() && this.model.queries() && this.model.code()){
                this.results(p.proc(null,JSON.parse(this.model.store()),this.model.queries().split(','), this.model.code()))
                this.pass(true)
                props.code('p.proc(null,'+this.model.store()+',\''+this.model.queries().split(',')+'\', \''+this.model.code()+'\')')
                props.list(this.results)
                props.changeTab("results")
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
            'Run anon procedure - p.proc(null,JSONData,JSONPathQueries,JSCode)', [
                m('button.warning',{onclick:ctrl.prefill},'pre-fill sample'),
                m('textarea[placeholder="JSON data"]', {
                    onchange: m.withAttr("value", ctrl.model.store),
                    value: ctrl.model.store()
                }),
                m('input[placeholder="JSONPath queries (comma separated)"]', {
                    onchange: m.withAttr("value", ctrl.model.queries),
                    value: ctrl.model.queries()
                }),
                m('textarea[placeholder="JS Code Procedure block (this.results array)"]', {
                    onchange: m.withAttr("value", ctrl.model.code),
                    value: ctrl.model.code()
                }),
                m("button", {
                    onclick: ctrl.save
                }, "Run")
            ]
        ])
    }
    return module
}
module.exports = form