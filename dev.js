#!/usr/bin/env node
"use strict";

exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var main = require("./src/complexity/main");

try {
    console.log(ansi_colors_1.yellowBright("WELCOME TO GENESE COMPLEXITY"));
    console.log();
    console.log(ansi_colors_1.yellowBright("JSON AST CREATION"));
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    var mainProcess = new main.Main();
    // const pathFolderToAnalyze = '/Users/utilisateur/Documents/projets/naval-group/code/full/20200611-1756-release-sprint-5/cyms/src/';
    const pathFolderToAnalyze =
        "/home/gmartin/Documents/projects/genese-bis/genese/toAnalyse";
    // const pathFolderToAnalyze = __dirname + '/src/complexity/core/mocks/';
    mainProcess.start(__dirname, pathFolderToAnalyze, __dirname, "java");
} catch (err) {
    console.error(
        ansi_colors_1.red("Error in conversion process : " + err.stack)
    );
}
