#!/usr/bin/env node
import { blueBright, red } from 'ansi-colors';
import { exec } from 'child_process';

const { program } = require('commander');

console.log(blueBright("Starts Genese cli"));

export const GENESE_DIR = __dirname;
export const PROJECT_DIR = process.cwd();

try {

    program.version('0.0.1')
        .description('Genese cli');

    program.command('new <type>')
        .description('New app | api')
        .action(() => {
            exec('node node_modules/genese-api-angular/index.js', (error, stdout, stderr) => {
                if (error) {
                    console.log(red(`Error in Genese cli execution : ${error.message}`));
                    return;
                }
                if (stderr) {
                    console.log(red(`Error in Genese cli command : ${stderr}`));
                    return;
                }
                console.log(`${stdout}`);
                console.log(blueBright("Genese cli created genese API successfully."));
            });
        });

    program.parse(process.argv);

} catch (err) {
    console.error(red(`Error in Genese cli process : ${err}`));
}




