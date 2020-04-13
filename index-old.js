#!/usr/bin/env node
const { program } = require('commander');

console.log("Starts Genese cli");

const zzz = __dirname;
console.log("zzz ", zzz);

program.version('0.0.1')
    .description('Genese cli');

program.option('-h, --help', 'Help genese CLI')
    .option('-d, --debug', 'Debugging');

program.command('new <type>')
    .description('New app | api')
    .action((context) => {
        console.log('The context is : ', context);
    });

program.parse(process.argv);

export const PROJECT_DIR = 'aaa';

console.log("End of Genese cli");



