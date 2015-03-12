
var app = function() {

    var module = {}
    module.controller = function () {
    }
    module.view = function () {

        return m('.content', [
            m('.panel', 'Welcome to the PraetorJS administration editor demo page!',
              [
                  m('p',
                    'We will walk through some simple examples to demonstrate the way you can create and recall procedures'),
                  m('p', 'Check out the tools in the menu to the left.'),
                  m('a[href="http://goessner.net/articles/JsonPath/"]',
                    'JSONPath reference to create queries.')
              ]
            )
        ])
    }

    return module
}

module.exports = app