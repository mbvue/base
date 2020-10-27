#!/usr/bin/env node
const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');

module.exports = function (args) {
    let loading = ora();
    loading.start(`Start Formatting Style...\n`);

    try {
        execSync(`${path.resolve(process.cwd(), './node_modules/.bin/eslint')} --ext .js --ext .jsx --ext .ts --ext .tsx --ext .vue --ext .md --fix ./`);
        execSync(`${path.resolve(process.cwd(), './node_modules/.bin/stylelint')} "**/*.less" --syntax less --fix`);

        loading.succeed('Succee Format Style...');
    } catch (error) {
        loading.fail('Fail Format Style...');
    }
};
