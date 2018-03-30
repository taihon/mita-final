'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./Client/"

module.exports = {
    entry: {
        main: [
            srcFolder + "index.jsx"
        ]
    }, 
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        publicPath: 'assets/',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
        loaders: [
            {
                test: [/\.jsx$/,/\.js$/],
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0", "react", "react-hmre"]
                }
            },
            {
                test: /\.css/,
                use:['style-loader','css-loader']
            }
        ]
    },
    resolve: {
        extensions:['.js','.jsx']
    },
    plugins: [
    ]
};