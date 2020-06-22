#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var mainAst = require("./src/complexity/ast-to-reports/json-ast-to-reports");

try {
    console.log(ansi_colors_1.yellowBright("WELCOME TO GENESE COMPLEXITY : REPORTS GENERATION FROM JSON AST"));
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    var mainProcess = new mainAst.JsonAstToReports();
    mainProcess.start(__dirname, '/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese/src/complexity/core/mocks', __dirname);
}
catch (err) {
    console.error(ansi_colors_1.red("Error in ast process : " + err.stack));
}
