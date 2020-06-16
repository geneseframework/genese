#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main_1 = require("./src/complexity/old/main");
var child_process_1 = require("child_process");
var program = require('commander').program;
// ---------------------------------------------------------------------------------------------------------
//                                          GENESE CLI
// ---------------------------------------------------------------------------------------------------------
try {
    console.log("WELCOME TO GENESE CLI");
    program.version('0.0.5')
        .description('Genese cli');
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    program.command('cpxFactors [pathToAnalyse]')
        .description('Calculates cognitive and cyclomatic complexities')
        .action(function (pathToAnalyze) {
        console.log(ansi_colors_1.blueBright("STARTS GENESE COMPLEXITY CLI"));
        var path = pathToAnalyze !== null && pathToAnalyze !== void 0 ? pathToAnalyze : './';
        console.log('PATH TO ANALYZE : ' + path);
        var mainProcess = new main_1.Main();
        mainProcess.start(process.cwd(), path, __dirname);
    });
    // ----------------------------------   GENESE API for Angular   ----------------------------------------
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
            if (stdout && stdout.length) {
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
