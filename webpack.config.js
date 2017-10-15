var webpack = require("webpack"),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV,
    prodBase = "https://contactbookapp.herokuapp.com",
    devBase = "http://localhost:3001";

module.exports = {
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        __dirname + '/src' + '/index.js'
    ],
    output: {
        path: __dirname + '/public/js',
        publicPath: 'js/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            'plugins': [
                                'lodash',
                                'transform-class-properties'
                            ],
                            'presets': [
                                "es2015",
                                "react",
                                "stage-3"
                            ]
                        }
                    }]
            }]
    },
    devServer: {
        contentBase: __dirname + '/public'
    },
    plugins: [
        new CleanWebpackPlugin(['js/bundle.js'], {
            root: __dirname + '/public',
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            "API_URL": JSON.stringify(env === 'production' ? prodBase : devBase)
        })
    ]
};