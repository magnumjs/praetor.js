m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")
utils = require("../../utils.js")
autocompleter = require("../../components/autocompleter")


// dashboard module
var dashboard = function () {

    //model
    var movies = {}

    //https://yts.re/api/v2/list_movies.json?sort=seeds&limit=15

    movies.listEven = function () {
        return utils.m.requestWithFeedback({method: "GET", url: "./data/movies.json"}).then(function (list) {
            return list.data.movies
            //return list.data.movies.filter(function (user) {
            //    return user.id % 2 == 0
            //});
        });
    }

    var module = {
        //model
        data: {},

        controller: function () {
            this.onunload = function () {
                document.getElementsByClassName("content")[0].style.backgroundColor = '#ffffff'
            }.bind(this)

            //$..data.movies[?(@.genres.indexOf('Drama')>-1)]

            this.error = m.prop("")

            this.selectedProject = m.prop()
            this.projectAC = new autocompleter()
            this.projectAC.vm.field='title'
           // this.projects = m.prop([{id: 1, name: "John's project"}, {id: 2, name: "Bob's project"}, {id: 2, name: "Mary's project"}]);

            this.projects = movies.listEven().then(function (users) {

                // id, title, url, small_cover_image

               // this.projects = m.prop([{id: 1, name: "John's project"}, {id: 2, name: "Bob's project"}, {id: 2, name: "Mary's project"}]);
                return users

            }, this.error)
        },

        view: function (ctrl) {
            return m(".card", {
                config: function (ele, init) {
                    // change body style
                    document.getElementsByClassName("content")[0].style.backgroundColor = '#f1f1f3'
                }
            }, [
             m('span.card-color', m('h1.cards.card-color-title', 'New Movies')),
             m('.card-content', [
                 m('p.cards', 'Search newest: ',
                   //m('input[placeholder="Filter by Genre"]')
                   ctrl.projectAC.view({field:'title',data: ctrl.projects, binds: ctrl.selectedProject})
                 ),
                 m('h4.cards', 'See run time code')
             ])
            ])
        }
    }
    return module;
}

module.exports = dashboard

