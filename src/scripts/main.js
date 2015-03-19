module.exports = {
    getPage: function (name, callback) {
        // no better way to do this with webpack for chunk files ?
        if (name.indexOf("demo") !== -1) {
            require(["./modules/demo/app.js"], function (require) {
                callback(name, require("./modules/demo/app.js"));
            });
        }
        else if (name.indexOf("dash") !== -1) {
            require(["./modules/dashboard/app.js"], function (require) {
                callback(name, require("./modules/dashboard/app.js"));
            });
        }
        else if (name.indexOf("welcome") !== -1) {
            require(["./modules/welcome/app.js"], function (require) {
                callback(name, require("./modules/welcome/app.js"));
            });
        }
        else if (name.indexOf("proc") !== -1) {
            require(["./modules/proc/app.js"], function (require) {
                callback(name, require("./modules/proc/app.js"));
            });
        }
        else if (name.indexOf("query") !== -1) {
            require(["./modules/query/app.js"], function (require) {
                callback(name, require("./modules/query/app.js"));
            });
        }
        else if (name.indexOf("store") !== -1) {
            require(["./modules/store/app.js"], function (require) {
                callback(name, require("./modules/store/app.js"));
            });
        }
    },
    persist: require('./persistence'),
    utils: require('./utils')
};