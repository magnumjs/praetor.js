m = require('mithril');
p = require("praetor")
persist = require("../../persistence.js")



var html = '<link href="http://fonts.googleapis.com/css?family=Roboto:400italic,100,700,400" rel="stylesheet" type="text/css"> \
<style>body{background-color: #f1f1f3;</style>\
<div class="card"> \
    <span class="card-color">\
 	<h1 class="cards card-color-title">New Movies</h1>\
 </span>\
    <div class="card-content">\
        <p class="cards">Search newest: <input placeholder="Filter by Genre" /></p>\
        <h4 class="cards">See run time code</h4>\
    </div>\
</div>'


// dashboard module
var dashboard = function() {

    var module = {
        //model
        data: {

        },

        controller: function () {


        },

        view: function (ctrl) {

            return m("div", {innerHTML:html })
        }
    }
    return module;
}

module.exports = dashboard