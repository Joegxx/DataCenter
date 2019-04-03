const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js'
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ],
    //设置跨域代理
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            //匹配代理的url
            '/whtc': {
                // 目标服务器地址
                target: 'http://127.0.0.1:8084',
                //路径重写
                pathRewrite: {'^/whtc' : '/whtc'},
                changeOrigin: true
            },
            '/cbr': {
                // 目标服务器地址
                target: 'http://127.0.0.1:12321',
                //路径重写
                pathRewrite: {'^/cbr' : '/cbr'},
                changeOrigin: true
            },
            //匹配代理的url
            '/dbms': {
                // 目标服务器地址
                target: 'http://127.0.0.1:19999',
                //路径重写
                pathRewrite: {'^/dbms' : '/dbms'},
                changeOrigin: true
            },
            '/noauth/msg': {
                // 目标服务器地址
                target: 'http://127.0.0.1:8597',
                //路径重写
                pathRewrite: {'^/noauth/msg' : '/noauth/msg'},
                changeOrigin: true
            },
            '/sys': {
                // 目标服务器地址
                target: 'http://188.188.22.166:8087',
                //路径重写
                pathRewrite: {'^/sys' : '/sys'},
                changeOrigin: true
            },
            '/open/cbr': {
                // 目标服务器地址
                target: 'http://127.0.0.1:18086',
                //路径重写
                pathRewrite: {'^/open/cbr' : '/open/cbr'},
                changeOrigin: true
            },
            '/bmap': {
                // 目标服务器地址
                target: 'http://api.map.baidu.com',
                //路径重写
                pathRewrite: {'^/' : '/'},
                changeOrigin: true
            },
            '/deploy': {
                // 目标服务器地址
                target: 'http://127.0.0.1:8088',
                //路径重写
                pathRewrite: {'^/deploy' : '/deploy'},
                changeOrigin: true
            }
        }
    }
});