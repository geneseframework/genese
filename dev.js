#!/usr/bin/env node
"use strict";

exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main = require("./dist/src/complexity/main");

try {
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    var mainProcess = new main.Main();
    const pathFolderToAnalyze = 'my-absolute-folder'
    mainProcess.start(__dirname, pathFolderToAnalyze, __dirname, "java");
} catch (err) {
    console.error(
        ansi_colors_1.red("Error in conversion process : " + err.stack)
    );
}
