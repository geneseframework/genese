#!/usr/bin/env node
"use strict";

exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main = require("./dist/src/complexity/main");

try {
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    var mainProcess = new main.Main();
    const pathFolderToAnalyze = '/home/akueny/Dev/genese-github/toAnalyse'
    mainProcess.start(__dirname, pathFolderToAnalyze, __dirname, "ts", false, false, false)
        .then(exitCode => {
            process.exit(exitCode);
        });
} catch (err) {
    console.error(
        ansi_colors_1.red("Error in conversion process : " + err.stack)
    );
}
