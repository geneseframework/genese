#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main = require("./src/complexity/main");
var child_process_1 = require("child_process");
var program = require('commander').program;
// ---------------------------------------------------------------------------------------------------------
//                                          GENESE CLI
// ---------------------------------------------------------------------------------------------------------
try {
    console.log("WELCOME TO GENESE CLI");
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    console.log(ansi_colors_1.blueBright("STARTS GENESE COMPLEXITY CLI"));
    var mainProcess = new main.Main();
    mainProcess.start(__dirname, './', __dirname);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in Genese cli process : " + err));
}
