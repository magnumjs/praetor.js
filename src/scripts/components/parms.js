m = require('mithril');

var parms = {}
parms.model = {
    remove: function (list, idx) {
        list().splice(idx, 1)
    },
    listToParms: function (list) {
        var parms = {}
        list().forEach(function (item) {
            item.name() != '' ? parms[item.name()] = item.value() : null
        })
        return parms
    },
    parmsToList: function (parms, list) {
        for (var k in parms()) {
            list().push({
                            name: m.prop(k),
                            value: m.prop(parms()[k])
                        })
        }
    },
    addOne: function (list) {
        list().push({
                        name: m.prop(''),
                        value: m.prop('')
                    })
    }
}
parms.controller = function (props) {
    this.parms = props.parms
    this.list = m.prop([])
    this.show = props.show || 0
    parms.model.parmsToList(this.parms, this.list)
    this.list().length == 0 ? parms.model.addOne(this.list) : null
}

parms.view = function (ctrl) {
    return m('.parms', {
         onchange: function () {
             ctrl.parms(parms.model.listToParms(ctrl.list))
         }
     }, 'Parms',
     m('button', {
         onclick: function () {
             parms.model.addOne(ctrl.list)
         }
     }, '+'),
     ctrl.show ? m('button', {
         onclick: function () {
             var state = JSON.stringify(parms.model.listToParms(ctrl.list))
             console.log(state)
         }
     }, 'show') : '',
     ctrl.list().map(function (item, idx) {
         return parmFieldRow(ctrl.list, idx)
     })
    )
}

function parmFieldRow(list, idx) {
    return m('.parms.row', [
        m('div.name', m("input[placeholder='Name']", {
            onchange: m.withAttr("value", list()[idx].name),
            value: list()[idx].name()
        })),
        m('div.value', m("input[placeholder='Value']", {
            onchange: m.withAttr("value", list()[idx].value),
            value: list()[idx].value()
        })),
        m('button', {
            onclick: function (idx) {
                parms.model.remove(list, idx)
            }.bind(null, idx)
        }, '-')
    ])
}

module.exports = parms

/*
 var app = {}
 app.controller = function() {
 this.params = m.prop({
 name: 'test'
 })
 this.parmsInstance = m.module(parms, {
 parms: this.params
 })
 }
 app.view = function(ctrl) {
 return m('.form', {
 onchange: function() {
 console.log(JSON.stringify(ctrl.params()))
 }
 }, ctrl.parmsInstance, m('.state', ctrl.params()))
 }
 m.module(document.body, app)
 */