#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main = require("./src/complexity/main");

try {
    console.log("WELCOME TO GENESE DEBUG");
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    console.log(ansi_colors_1.blueBright("STARTS GENESE COMPLEXITY CLI"));
    var mainProcess = new main.Main();
    mainProcess.start(__dirname, './', __dirname);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in debug process : " + err.stack));
}
