

var utils = {}

// mithril js helpers
utils.m={}


utils.m.layout = function(nav, body) {
    return m(".container", [
        m(".nav", nav),
        m(".content", body)
    ])
}

utils.m.mixinLayout = function(layout, nav, body) {
    return function() {
        return layout(nav(), body())
    }
}

utils.m.binds = function(data) {
    return {onchange: function(e) {
        data[e.target.id](e.target.value);
    }}
}

utils.m.viewModelMap = function(signature) {
    var map = {}
    return function(key) {
        if (!map[key]) {
            map[key] = {}
            for (var prop in signature) map[key][prop] = m.prop(signature[prop]())
        }
        return map[key]
    }
}

utils.getObjectKeyByVal =function(associativeArray, value) {
    var foundKey;
    Object.keys(associativeArray).forEach(function (key, idx) {
        if(key == value){ foundKey = idx }
        return;
    })
    return foundKey
}

utils.resizeTextarea=function(id) {
    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on' + event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }
   var init =function (id) {
        var text = document.getElementById(id);

        function resize() {
            text.style.height = 'auto';
            text.style.height = text.scrollHeight + 'px';
        }

        /* 0-timeout to get the already changed text */
        function delayedResize() {
            window.setTimeout(resize, 0);
        }

        observe(text, 'change', resize);
        observe(text, 'cut', delayedResize);
        observe(text, 'paste', delayedResize);
        observe(text, 'drop', delayedResize);
        observe(text, 'keydown', delayedResize);

        //text.focus();
        //text.select();
        resize();
    }(id)
}

module.exports = utils