#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var child_process_1 = require("child_process");
var program = require('commander').program;
console.log(ansi_colors_1.blueBright("Starts Genese cli"));
exports.GENESE_DIR = __dirname;
exports.PROJECT_DIR = process.cwd();
try {
    program.version('0.0.1')
        .description('Genese cli');
    program.command('new <type>')
        .description('New app | api')
        .action(function () {
        child_process_1.exec('node node_modules/genese-api-angular/index.js', function (error, stdout, stderr) {
            if (error) {
                console.log(ansi_colors_1.red("Error in Genese cli execution : " + error.message));
                return;
            }
            if (stderr) {
                console.log(ansi_colors_1.red("Error in Genese cli command : " + stderr));
                return;
            }
            console.log(ansi_colors_1.blueBright("Genese cli created genese API successfully."));
        });
    });
    program.parse(process.argv);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in Genese cli process : " + err));
}
