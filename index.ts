#!/usr/bin/env node

require("./");
import { blueBright, red, yellowBright } from 'ansi-colors';
import { exec } from 'child_process';
import * as fs from 'fs-extra';

const { program } = require('commander');

console.log(blueBright("Starts Genese cli"));

console.log('INDEX.JS')
console.log('DIRNAME', __dirname);
export const PROJECT_DIR = process.cwd();

console.log('PROJECT_DIR', PROJECT_DIR);
fs.copyFileSync(__dirname + '/LICENSE', PROJECT_DIR + '/COPY');
// try {
//
//     program.version('0.0.4')
//         .description('Genese cli');
//
//     program.command('new <type>')
//         .description('New app | api')
//         .action(() => {
//             const pathIndex = `node ${PROJECT_DIR}/node_modules/genese-api-angular/index.js`;
//             exec(pathIndex, (error, stdout, stderr) => {
//                 if (error) {
//                     console.log(red(`Error in Genese cli execution : ${error.message}`));
//                     return;
//                 }
//                 if (stderr) {
//                     console.log(red(`Error in Genese cli command : ${stderr}`));
//                     return;
//                 }
//                 console.log(yellowBright(`${stdout}`));
//                 console.log(blueBright("Genese cli created genese API successfully."));
//             });
//         });
//
//     program.parse(process.argv);
//
// } catch (err) {
//     console.error(red(`Error in Genese cli process : ${err}`));
// }
//
//
//
//
