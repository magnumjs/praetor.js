m = require('mithril');


var autocompleter = function () {
    var autocompleter = {}
    autocompleter.vm = {
        term: m.prop(""),
        field:'name',
        search: function (value) {
            autocompleter.vm.term(value.toLowerCase())
        },
        filter: function (item) {
            return autocompleter.vm.term()
                   && item[autocompleter.vm.field].toLowerCase().indexOf(autocompleter.vm.term()) > -1
        }
    }
    autocompleter.view = function (ctrl) {
        return [
            m("div", [
                m("input", {oninput: m.withAttr("value", autocompleter.vm.search)})
            ]),
            ctrl.data().filter(autocompleter.vm.filter).map(function (item) {
                return m("div", {onclick: ctrl.binds.bind(this, item)}, item[ctrl.field]);
            })
        ];
    }
    return autocompleter
}

module.exports = autocompleter