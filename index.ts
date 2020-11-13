#!/usr/bin/env node

import { blueBright, red, yellowBright } from 'ansi-colors';
import { exec } from 'child_process';
import { Main } from './src/complexity/main';

const {program} = require('commander');
const pathNode = require('path');

const pkg = require('./package.json');


// ---------------------------------------------------------------------------------------------------------
//                                          GENESE CLI
// ---------------------------------------------------------------------------------------------------------

try {
    console.log(yellowBright('WELCOME TO GENESE CLI'));

    program.version(pkg.version)
        .description('Genese cli');

// -------------------------------------   GENESE COMPLEXITY   ------------------------------------------

    program.command('cpx [pathToAnalyse]')
        .description('Calculates Complexity Index and cyclomatic complexity')
        .option('-l, --language <language>', 'Language: js, ts, jsx, tsx or java', 'ts')
        .option('-md, --markdown', 'Markdown type report')
        .option('-c, --console', 'Disable report generation and outputs to console')
        .action((pathFolderToAnalyze, options) => {
            let path;
            if (pathNode.isAbsolute(pathFolderToAnalyze)) {
                path = pathFolderToAnalyze;
            } else {
                path = process.cwd() + (pathFolderToAnalyze ? '/' + pathFolderToAnalyze : '');
            }
            const mainProcess = new Main();

            mainProcess.start(process.cwd(), path, __dirname, options.language, options.markdown, options.console);
        });

// ----------------------------------   GENESE API for Angular   ----------------------------------------

    program.command('new <type>')
        .description('New app | api')
        .action(() => {
            console.log(blueBright('STARTS GENESE API FOR ANGULAR APPS'));
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
                if (stdout && stdout.length) {
                    console.log(yellowBright(`${stdout}`));
                }
                console.log(blueBright('API CREATED SUCCESSFULLY'));
            });
        });

    program.parse(process.argv);

} catch (err) {
    console.error(red(`Error in Genese cli process : ${err}`));
}
