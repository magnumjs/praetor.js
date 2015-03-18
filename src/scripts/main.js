module.exports = {
    persist : require('./persistence'),
    utils   : require('./utils'),
    dash    : require('./modules/dashboard/app'),
    store   : require('./modules/store/app'),
    query   : require('./modules/query/app'),
    proc    : require('./modules/proc/app'),
    home    : require('./modules/welcome/app'),
    demo    : require('./modules/demo/app')
};