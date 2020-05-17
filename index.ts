#!/usr/bin/env node

import { blueBright, red, yellowBright } from 'ansi-colors';
import { Main } from './src/complexity/main';
import { exec } from 'child_process';

const { program } = require('commander');

// ---------------------------------------------------------------------------------------------------------
//                                          GENESE CLI
// ---------------------------------------------------------------------------------------------------------

try {
    console.log("WELCOME TO GENESE CLI");

    program.version('0.0.5')
        .description('Genese cli');

    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------

    program.command('cpx [pathToAnalyse]')
        .description('Calculates cognitive and cyclomatic complexities')
        .action((pathToAnalyze) => {
            console.log(blueBright("STARTS GENESE COMPLEXITY CLI"));
            const path = pathToAnalyze ?? './';
            console.log('PATH TO ANALYZE : ' + path);
            const mainProcess = new Main();
            mainProcess.start(process.cwd(), path, __dirname)
        });

    // ----------------------------------   GENESE API for Angular   ----------------------------------------

    program.command('new <type>')
        .description('New app | api')
        .action(() => {
            console.log(blueBright("STARTS GENESE API FOR ANGULAR APPS"));
            const pathIndex = `node ${process.cwd()}/node_modules/genese-api-angular/index.js`;
            exec(pathIndex, (error, stdout, stderr) => {
                if (error) {
                    console.log(red(`Error in Genese cli execution : ${error.message}`));
                    return;
                }
                if (stderr) {
                    console.log(red(`Error in Genese cli command : ${stderr}`));
                    return;
                }
                if (stdout && stdout.length ) {
                    console.log(yellowBright(`${stdout}`));
                }
                console.log(blueBright("API CREATED SUCCESSFULLY"));
            });
        });

    program.parse(process.argv);

} catch (err) {
    console.error(red(`Error in Genese cli process : ${err}`));
}


