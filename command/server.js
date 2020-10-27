#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const portfinder = require('portfinder');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./webpack.config');
const customize = path.resolve(process.cwd(), './vue.config.js'); //自定义配置

module.exports = async function () {
    let config = baseConfig('development', fs.existsSync(customize) ? require(customize) : {}); //合并基础配置
    
    //处理端口
    if(!config.devServer.port){
        config.devServer.port = await portfinder.getPortPromise({ port: 8080, stopPort: 8888 });
    }

    //编译
    return new WebpackDevServer(webpack(config), config.devServer).listen(config.devServer.port);
}