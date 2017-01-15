let webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/document/entry.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'document.min.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.json$/, loader: 'json'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    externals: {
	    react: 'React',
        jquery: '$'
	},
    devtool: 'eval-source-map',
    plugins: [
        new webpack.BannerPlugin('This file is create by yeqiyeluo!')
    ],
    devServer: {
        contentBase: './dist/html',
        colors: true,
        inline: true,
        historyApiFallback: true
    }
};