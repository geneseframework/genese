#!/usr/bin/env node
const { program } = require('commander');


export const PROJECT_DIR = __dirname;

console.log('PROJECT_DIR : ', PROJECT_DIR);

var construction = require(PROJECT_DIR + '/construction/construction');

program.version('0.0.1')
    .description('Genese cli');

program.option('-h, --help', 'Help genese CLI')
    .option('-d, --debug', 'Debugging');

program.command('new <type>')
    .description('New app | api')
    .action((context) => {
        console.log('The context is : ', context);
        var geneseApi = new construction.Construction();
        geneseApi.startConstruction();
    });

program.parse(process.argv);


console.log("Starts Genese cli");



