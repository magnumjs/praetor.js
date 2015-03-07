m = require('mithril');
p = require("praetor")

var persistence = {}


persistence.init = function() {
    //load all from state
    var data = ['stores', 'queries', 'procs'];
    var map = {};
    data.forEach(function(val, idx) {
        map[val] = localStorage[val] ? JSON.parse(localStorage[val]) : {}
        if (val == 'stores') {
            for (k in map[val])
                map[val][k] = JSON.parse(map[val][k])
        }
    })
    console.log('state set')
}

persistence.model = function(name) {
    return {
        saveList: function(list) {
            localStorage[name] = JSON.stringify(list)
        },
        getList: function() {
            if(localStorage[name])
                return JSON.parse(localStorage[name])
            return {}
        }
    }
}


module.exports = persistence