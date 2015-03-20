m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")
utils = require("../../utils.js")
autocompleter = require("../../components/autocompleter")
var modal = require("../../components/modal")

var procMod = require("../../modules/proc/form")

var q = '$..data.movies[?(@.genres.indexOf("PARM")>-1)]'

// http://stackoverflow.com/questions/28353117/how-can-i-get-dynamic-google-now-style-cards-using-just-css-html

// dashboard module
var dashboard = function () {

    //model
    var movies = {}


    //https://yts.re/api/v2/list_movies.json?sort=seeds&limit=15

    movies.listEven = function () {
        return utils.m.requestWithFeedback({method: "GET", url: "./data/movies.json"}).then(function (list) {

            var result= p.proc(null,list,[q], null,{PARM:'Drama'})
            return result[0]
        });
    }

    var module = {
        //model
        data: {},

        controller: function () {

            this.modal = new modal();
            this.actions = persist.model('procs')
            this.list = this.actions.getList()
            this.storesList = persist.model('stores').getList()

            this.onunload = function () {
                document.getElementsByClassName("content")[0].style.backgroundColor = '#ffffff'
            }.bind(this)

            this.showHide=function(){
                return !!(this.toggle=!this.toggle||false)
            }.bind(this)

            this.error = m.prop("")

            this.selectedProject = m.prop()
            this.projectAC = new autocompleter()
            this.projectAC.vm.field='title'

            this.projects = movies.listEven().then(function (users) {

                // id, title, url, small_cover_image
                // add to viewModelMap

                return users

            }, this.error)

            this.mode = 'add'
            this.name

            this.procForm = m.module(procMod(),  {
                list       : this.list,
                mode       : this.mode,
                name       : this.name,
                storesList : this.storesList,
                actions    : this.actions
            })

            this.edit = function(name) {
                this.mode = 'edit'
                this.name = name
                this.modal.visible(true)
                this.procForm = m.module(procMod(),  {
                    list       : this.list,
                    mode       : this.mode,
                    name       : this.name,
                    storesList : this.storesList,
                    actions    : this.actions
                })
            }.bind(this)
        },

        view: function (ctrl) {
            return m('.dash',
                     editorButton(ctrl),
                     cards(ctrl)
            )
        }
    }
    return module;
}

function cards(ctrl){
    return m(".cards", {
        config: function (ele, init) {
            // change body style
            document.getElementsByClassName("content")[0].style.backgroundColor = '#f1f1f3'
        }
    }, card(ctrl, 'New Movies'))
}
function card(ctrl, name){
   return m(".card",[
       //background-color: #673AB7; #purple
       // background-color: #FFC107; orange
        m('span.card-color',{},
          m('h1.cards.card-color-title', {
              onclick: ctrl.edit.bind(null, name)
          }, name)),
        m('.card-content', [
            m('p.cards', 'Search newest: ',
              ctrl.projectAC.view({field:'title',data: ctrl.projects, binds: ctrl.selectedProject, placeholder:'Filter by Genre'})
            ),
            m('h4.cards',{onclick:ctrl.showHide}, 'See run time code',
              ctrl.toggle?m('textarea.json',q):'')
        ])
    ])
}
function editorButton(ctrl){
    return [m('button', {
        onclick: function() {
            ctrl.mode='add'
            ctrl.modal.visible(true)
        }
    }, 'Editor'),
    ctrl.modal.view(function() {
        return m("p.content", ctrl.procForm)
    })]
}

module.exports = dashboard

