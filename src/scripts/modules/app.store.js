m = require('mithril');
p = require("praetor")
app = require("../modules/app-modules.js")
passFail = require("../components/pass-fail")
tabbed = require("../components/tabs")
books = require('../../data/books')

var app = app || {}

app.booksString = JSON.stringify(books);
app.books = JSON.parse(app.booksString);



