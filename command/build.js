#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const webpack = require('webpack');
const baseConfig = require('./webpack.config');
const customize = path.resolve(process.cwd(), './vue.config.js'); //自定义配置

module.exports = function () {
    let loading = ora();
    loading.start(`Start Buiding...\n`);

    let config = baseConfig('production', fs.existsSync(customize) ? require(customize) : {}); //合并基础配置
    
    //编译
    return webpack(config).run(function() {
        loading.succeed(`Buid Succeed...\n`);
    });
}