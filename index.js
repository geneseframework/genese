#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main_1 = require("./src/complexity/main");
var child_process_1 = require("child_process");
var program = require('commander').program;
console.log("WELCOME TO GENESE CLI");
try {
    program.version('0.0.5')
        .description('Genese cli');
    program.command('cpx [pathToAnalyse]')
        .description('Calculates cognitive and cyclomatic complexities')
        .action(function (pathToAnalyze) {
        console.log(ansi_colors_1.blueBright("STARTS GENESE COMPLEXITY CLI"));
        console.log('PATH TO ANALYZE : ' + pathToAnalyze);
        var mainProcess = new main_1.Main();
        mainProcess.start(process.cwd(), pathToAnalyze, __dirname);
    });
    program.command('new <type>')
        .description('New app | api')
        .action(function () {
        console.log(ansi_colors_1.blueBright("STARTS GENESE API FOR ANGULAR APPS"));
        var pathIndex = "node " + process.cwd() + "/node_modules/genese-api-angular/index.js";
        child_process_1.exec(pathIndex, function (error, stdout, stderr) {
            if (error) {
                console.log(ansi_colors_1.red("Error in Genese cli execution : " + error.message));
                return;
            }
            if (stderr) {
                console.log(ansi_colors_1.red("Error in Genese cli command : " + stderr));
                return;
            }
            if (stdout && stdout.length > 0) {
                console.log(ansi_colors_1.yellowBright("" + stdout));
            }
            console.log(ansi_colors_1.blueBright("API CREATED SUCCESSFULLY"));
        });
    });
    program.parse(process.argv);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in Genese cli process : " + err));
}
