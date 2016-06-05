var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './js/app.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
				/*
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
				*/
    ],
    module: {
        loaders: [
            {exclude: /localforage/, test: /\.js$/, loader: 'babel' },
            {test: require.resolve('chart.js'), loader: 'imports?this=>window'},
            {test: /\.scss$/, loader: 'style!css!sass?includePaths[]=' + bourbon }
        ]
    }
}
