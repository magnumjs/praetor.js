var dest = "./.tmp";
var src = './src';

module.exports = {
    browserify: {
        // Enable source maps
        debug: true,
        bundleConfigs: [{
                            entries: src + '/scripts/app.js',
                            dest: dest,
                            outputName: 'app.js'
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