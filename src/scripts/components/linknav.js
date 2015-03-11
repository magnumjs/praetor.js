m = require('mithril');


mapActions = function (options){
    var selectedIndex = (options || {}).selectedIndex
    linkMap       = (options || {}).linkMap
    style         = (options || {}).style

    if(style=='select'){
        return m('select.silver', {onchange: function () {
            selectedIndex(this.selectedIndex)
            m.route(linkMap[this.selectedIndex].link)
        }},[
                     linkMap.map(function(d, i){
                         return m('option', {
                             selected:selectedIndex()==i?true:false,
                             config: m.route, value : i, innerHTML : d.text
                         })
                     })
                 ])
    } else {
        return [
            m('ol',
              linkMap.map(function (obj, idx) {
                  return m('li', {key: idx, config: m.route},
                           m('a.action', {
                                 onclick: function (type, e) {
                                     ctrl.type = type
                                     ctrl.id(idx)
                                 }.bind(this, obj.type)
                             }
                               , obj.text))
              })
            )
        ]
    }
}

module.exports = mapActions