var dest = "./.tmp";
var src = './src';
var path        = require('./config').path;
var webpack        = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var output = 'bundle.js'

module.exports = {
    webpack : {
        output: {
            path: __dirname+'/'+dest,
            filename: "[name].js",
            publicPath:'./',
            chunkFilename: "js/[name].js",
            sourceMapFilename :"[name].map"
        },
        plugins: [ new CommonsChunkPlugin("init.js") ],
        watch: true,
        module: {
            loaders: [
                { test: /\.json/, loader: "json" },

               // { test: /\.css$/, loader: 'style!css' },
            ]
        }
    },
    browserify: {
        // Enable source maps
        debug: true,
        bundleConfigs: [{
                            entries: src + '/scripts/app.js',
                            dest: dest,
                            outputName: 'main.js'
                        }]
    },

    data: {
    src: src + "/data/**",
        dest: "./dist/data"
},
    images: {
        src: src + "/images/**",
        dest: "./dist/images"
    }
};