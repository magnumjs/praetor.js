m = require('mithril');


var getStoreNamesListSelect =function (stores, setterGetter){

    return m('label.select',m('select', {
        onchange: m.withAttr("value", setterGetter),
        value: setterGetter()
    },[
                                  stores.map(function(d, i){
                                      return m('option', {value : i==0?'': d, innerHTML : d })
                                  })
                              ]))
}

module.exports = getStoreNamesListSelect