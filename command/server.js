#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const portfinder = require('portfinder');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./config');
const customizeConfig = path.resolve(process.cwd(), './vue.config.js'); //自定义配置

module.exports = async function () {
    let config = baseConfig('development', fs.existsSync(customizeConfig) ? require(customizeConfig) || {} : {}); //合并基础配置
    if(!config.devServer.port) config.devServer.port = await portfinder.getPortPromise({ port: 8080, stopPort: 8888 }); //处理端口

    return new WebpackDevServer(webpack(config), config.devServer).listen(config.devServer.port);
}