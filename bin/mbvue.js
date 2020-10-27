#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const command = require('../command');

program.version(require('../package').version).usage(chalk.green('<command> [options]'));  //定义版本、指令样式
program.command('server').description(chalk.green('Run Web Service')).alias('s').action(function () { command.server(program.args); }); //运行WEB服务
program.command('build').description(chalk.green('Run Build Web')).alias('b').action(function () { command.build(program.args); }); //打包WEB应用
program.command('lint').description(chalk.green('Run Lint Style')).alias('l').action(function () { command.lint(program.args); }); //格式化样式

program.parse(process.argv); //解析参数

//未带参数，直接显示帮助信息
if(!program.args.length) {
    return program.help();
}