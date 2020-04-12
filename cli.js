#!/usr/bin/env node
"use strict";
var program = require('commander').program;
exports.PROJECT_DIR = __dirname;
console.log('PROJECT_DIR : ', exports.PROJECT_DIR);
var construction = require(exports.PROJECT_DIR + '/construction/construction');
program.version('0.0.1')
    .description('Genese cli');
program.option('-h, --help', 'Help genese CLI')
    .option('-d, --debug', 'Debugging');
program.command('new <type>')
    .description('New app | api')
    .action(function (context) {
    console.log('The context is : ', context);
    var geneseApi = new construction.Construction();
    geneseApi.startConstruction();
});
program.parse(process.argv);
console.log("Starts Genese cli");
