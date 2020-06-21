#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var mainAst = require("./src/complexity/ast-to-reports/main-ast");

try {
    console.log("WELCOME TO GENESE AST");
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    console.log(ansi_colors_1.blueBright("STARTS GENESE COMPLEXITY AST CLI"));
    var mainProcess = new mainAst.MainAst();
    mainProcess.start(__dirname, '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks', __dirname);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in ast process : " + err.stack));
}
