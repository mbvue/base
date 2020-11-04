#!/usr/bin/env node
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

module.exports = function (args) {
    let loading = ora();
    loading.start(`start formatting style...\n`);

    try {
        execSync(`${path.resolve(process.cwd(), './node_modules/.bin/eslint')} --ext .js --ext .jsx --ext .ts --ext .tsx --ext .vue --ext .md --fix ./`);
        execSync(`${path.resolve(process.cwd(), './node_modules/.bin/stylelint')} "**/*.{css,scss,sass}" --fix`);

        loading.succeed('succee format style...');
    } catch (error) {
        if(error.output) {
            error.output.map(obj => {
                if(obj){
                    console.log(chalk.red(obj.toString()));
                }
            });
        }
        loading.fail('fail format style...');
    }
};
