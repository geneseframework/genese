#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require('commander').program;
console.log("Starts Genese cli");
var zzz = __dirname;
console.log("zzz ", zzz);
program.version('0.0.1')
    .description('Genese cli');
program.option('-h, --help', 'Help genese CLI')
    .option('-d, --debug', 'Debugging');
program.command('new <type>')
    .description('New app | api')
    .action(function (context) {
    console.log('The context is : ', context);
});
program.parse(process.argv);
exports.PROJECT_DIR = 'aaa';
console.log("End of Genese cli");
