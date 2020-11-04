#!/usr/bin/env node
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./config');
const customize = path.resolve(process.cwd(), './vue.config.js'); //自定义配置

module.exports = function () {
    let loading = ora();
    loading.start(`start buiding...\n`);

    return webpack(baseConfig('production', fs.existsSync(customize) ? require(customize) || {} : {})).run(function() {
        loading.succeed(`buid succeed...\n`);
    });
}