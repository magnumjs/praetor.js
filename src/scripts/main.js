module.exports = {
    persist : require('./persistence'),
    dash    : require('./modules/dashboard/app'),
    store   : require('./modules/store/app'),
    query   : require('./modules/query/app'),
    demo    : require('./modules/demo/app')
};