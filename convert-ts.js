#!/usr/bin/env node
"use strict";

exports.__esModule = true;
var ansi_colors_1 = require("ansi-colors");
var mainAst = require("./src/complexity/languages-to-ast/main-language-to-ast");

try {
    console.log("WELCOME TO GENESE COMPLEXITY");
    // -------------------------------------   GENESE COMPLEXITY   ------------------------------------------
    // console.log(ansi_colors_1.blueBright("STARTS GENESE CONVERSION TO JSON AST"));
    var mainProcess = new mainAst.MainConvertTs();
    mainProcess.start(__dirname, __dirname + '/src/complexity/core/mocks/', __dirname, 'typescript');
}
catch (err) {
    console.error(ansi_colors_1.red("Error in conversion process : " + err.stack));
}
