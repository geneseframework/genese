"use strict";
exports.__esModule = true;
exports.Main = exports.showDuration = exports.duration = exports.START = void 0;
var file_service_1 = require("./core/services/file.service");
var options_model_1 = require("./core/models/options.model");
var language_to_json_ast_1 = require("./languages-to-json-ast/language-to-json-ast");
var json_ast_to_reports_1 = require("./json-ast-to-reports/json-ast-to-reports");
var chalk = require("chalk");
exports.START = Date.now();
function duration() {
    return (Date.now() - exports.START) / 1000;
}
exports.duration = duration;
function showDuration(message, color) {
    if (color === void 0) { color = 'cyanBright'; }
    console.log(chalk[color](message), duration());
}
exports.showDuration = showDuration;
/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
var Main = /** @class */ (function () {
    function Main() {
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     */
    Main.prototype.start = function (pathCommand, pathFolderToAnalyze, pathGeneseNodeJs) {
        console.log("PATH TO ANALYZE : " + pathFolderToAnalyze);
        options_model_1.Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        language_to_json_ast_1.LanguageToJsonAst.start(options_model_1.Options.pathFolderToAnalyze);
        json_ast_to_reports_1.JsonAstToReports.start(pathCommand);
    };
    return Main;
}());
exports.Main = Main;
