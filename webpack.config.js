var webpack = require('webpack');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

function getOutputFilename() {
    if (process.env.NODE_ENV === 'production') {
        return './server/public/js/[name].js';
    }

    return '/js/[name].js';
}

var ignore = new webpack.IgnorePlugin(/\.svg$/)

module.exports = {
    devtool: 'source-map',
    entry: {
        main: getEntrySources([
            './scripts/main.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: getOutputFilename()
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer', 'sass'] }
        ]
    },
    plugins: [ignore]
};
