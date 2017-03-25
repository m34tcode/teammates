const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const ROOT = './src/main/webapp';
const BUILD = './build/exploded-app';

// Map file names e.g. x/y.es6 -> entry['x/y'] = x/y.es6
const entry = {};
glob.sync(`${ROOT}/**/*.es6`).forEach((file) => {
    const pathObj = path.parse(file);
    const dir = pathObj.dir.replace(ROOT, '');
    const name = pathObj.name;
    const filePath = path.join(dir, name);
    entry[filePath] = file;
});

const babel = {
    test: /\.(?:js|es6)$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env'],
            cacheDirectory: true,
        }
    },
};

module.exports = {
    entry,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, BUILD),
    },
    module: {
        rules: [
            babel,
        ],
    },
    stats: 'errors-only',
};
