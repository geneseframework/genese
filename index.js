#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var main_1 = require("./src/complexity/main");
var main = require("./src/complexity/main.js");
var ansi_colors_1 = require("ansi-colors");
var child_process_1 = require("child_process");
var program = require('commander').program;
console.log(ansi_colors_1.blueBright("Starts Genese cli"));
console.log('INDEX.JS');
console.log('DIRNAME', __dirname);
exports.PROJECT_DIR = process.cwd();
console.log('PROJECT_DIR', exports.PROJECT_DIR);
try {
    program.version('0.0.4')
        .description('Genese cli');
    program.command('cpx [pathToAnalyse]')
        .description('Calculates cognitive and cyclomatic complexities')
        .action(function (pathToAnalyse) {
        console.log('PATH TO ANALYSE', pathToAnalyse);
        var mainProcess = new main_1.Main();
        console.log('MAIN', mainProcess);
        console.log('ARGS', program.arg);
        mainProcess.start(process.cwd(), pathToAnalyse, __dirname);
        // const pathIndex = `node ${PROJECT_DIR}/node_modules/genese-api-angular/index.js`;
        // exec(pathIndex, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(red(`Error in Genese cli execution : ${error.message}`));
        //         return;
        //     }
        //     if (stderr) {
        //         console.log(red(`Error in Genese cli command : ${stderr}`));
        //         return;
        //     }
        //     console.log(yellowBright(`${stdout}`));
        //     console.log(blueBright("Genese cli created genese API successfully."));
        // });
    });
    program.command('new <type>')
        .description('New app | api')
        .action(function () {
        var pathIndex = "node " + exports.PROJECT_DIR + "/node_modules/genese-api-angular/index.js";
        child_process_1.exec(pathIndex, function (error, stdout, stderr) {
            if (error) {
                console.log(ansi_colors_1.red("Error in Genese cli execution : " + error.message));
                return;
            }
            if (stderr) {
                console.log(ansi_colors_1.red("Error in Genese cli command : " + stderr));
                return;
            }
            console.log(ansi_colors_1.yellowBright("" + stdout));
            console.log(ansi_colors_1.blueBright("Genese cli created genese API successfully."));
        });
    });
    program.parse(process.argv);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in Genese cli process : " + err));
}
