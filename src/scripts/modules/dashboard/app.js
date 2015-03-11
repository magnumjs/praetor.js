m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")

// dashboard module
var dashboard = function () {

    //model
    var User = {}

    //https://yts.re/api/v2/list_movies.json?sort=seeds&limit=15

    User.listEven = function () {
        return m.request({method: "GET", url: "./data/movies.json"}).then(function (list) {
            //console.log(list)
            return list.data.movies.filter(function (user) {
                return user.id % 2 == 0
            });
        });
    }

    var module = {
        //model
        data: {},

        controller: function () {
            this.onunload = function () {
                document.getElementsByClassName("content")[0].style.backgroundColor = '#fff'
            }.bind(this)
            //$..data.movies[?(@.genres.indexOf('Drama')>-1)]

            this.error = m.prop("")

            this.users = User.listEven().then(function (users) {
                //if (users.length == 0) m.route("/add");
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
                   m('input[placeholder="Filter by Genre"]')),
                 m('h4.cards', 'See run time code')
             ])
            ])
        }
    }
    return module;
}

module.exports = dashboard

var autocompleter = function () {
    var autocompleter = {}
    autocompleter.vm = {
        term: m.prop(""),
        search: function (value) {
            autocompleter.vm.term(value.toLowerCase())
        },
        filter: function (item) {
            return autocompleter.vm.term()
                   && item.name.toLowerCase().indexOf(autocompleter.vm.term()) > -1
        }
    }
    autocompleter.view = function (ctrl) {
        return [
            m("div", [
                m("input", {oninput: m.withAttr("value", autocompleter.vm.search)})
            ]),
            ctrl.data().filter(autocompleter.vm.filter).map(function (item) {
                return m("div", {onclick: ctrl.binds.bind(this, item)}, item.name);
            })
        ];
    }
    return autocompleter
}