#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var child_process_1 = require("child_process");
var main_1 = require("./src/complexity/main");
var program = require('commander').program;
var pkg = require('./package.json');
// ---------------------------------------------------------------------------------------------------------
//                                          GENESE CLI
// ---------------------------------------------------------------------------------------------------------
try {
    console.log(ansi_colors_1.yellowBright("WELCOME TO GENESE CLI"));
    program.version(pkg.version)
        .description('Genese cli');
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    program.option('-l, --language <language>', 'Language');
    program.command('cpx [pathToAnalyse]')
        .description('Calculates Complexity Index and cyclomatic complexity')
        .action(function (pathFolderToAnalyze) {
        var path = process.cwd() + (pathFolderToAnalyze ? '/' + pathFolderToAnalyze : '');
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
