m = require('mithril');


var utils = {}
utils.types = {OBJECT : "[object Object]", ARRAY : "[object Array]", STRING : "[object String]", FUNCTION : "function" }
utils.type = {}.toString
utils.isFunction =function(obj){
    return typeof obj === utils.types.FUNCTION ? true : false
}
utils.jsonPathValue =function(obj){
    function index(obj,i) {return obj[i]}
    return string.split(sep || '.').reduce(index, obj)
}

//component
var tabbed = {
    controller :function(options,extras){
        this.tabs=options.tabs
        this.changeTab=options.changeTab
    },
    view:function(ctrl,options, extras){
        return m('.tabbed',
                 m(".tabs", [
                     tabbed.tabs({
                                     tabs : ctrl.tabs,
                                     selectedItem: options.selectedItem,
                                     onchange: ctrl.changeTab
                                 }),
                 ]),
                 tabbed.choose(options.selectedItem, ctrl.tabs,extras)
        )
    }
}

tabbed.tabs = function(ctrl) {
    return m("ul", ctrl.tabs.map(function(tabItem,idx){
        return m("li", [tabbed.tab(ctrl, tabItem.name)])
    }))
}
tabbed.tab = function(ctrl, name) {
    return m("a", {
                 class: ctrl.selectedItem == name ? "selected" : "",
                 onclick: ctrl.onchange.bind(this, name)},
             name)
}
tabbed.choose = function(name, options, parms) {
    var content
    options.forEach(function(item, idx){
        return item.name==name&&(void 0===parms.key&&(parms.key=idx),content=item.content)
    })
    // if content is function
    var comp = utils.isFunction(content) ? content() : content
    return m.module(comp,parms)
}

module.exports = tabbed