"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.showDuration = exports.duration = exports.START = void 0;
const file_service_1 = require("./core/services/file.service");
const options_model_1 = require("./core/models/options.model");
const language_to_json_ast_1 = require("./languages-to-json-ast/language-to-json-ast");
const json_ast_to_reports_1 = require("./json-ast-to-reports/json-ast-to-reports");
const chalk = require("chalk");
exports.START = Date.now();
function duration() {
    return (Date.now() - exports.START) / 1000;
}
exports.duration = duration;
function showDuration(message, color = 'cyanBright') {
    console.log(chalk[color](message), duration());
}
exports.showDuration = showDuration;
/**
 * Parse AST files into JsonAst format and then creates Complexity reports from the JsonAst file
 */
class Main {
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathFolderToAnalyze
     * @param pathGeneseNodeJs
     */
    // TODO : Add language option and path to JsonAst file
    start(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs) {
        console.log(`PATH TO ANALYZE : ${pathFolderToAnalyze}`);
        options_model_1.Options.setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        // LanguageToJsonAst.start('/Users/utilisateur/Documents/perso_gilles_fabre/projets/genese/genese-tests/src/');
        showDuration('START ! ', 'greenBright');
        language_to_json_ast_1.LanguageToJsonAst.start(options_model_1.Options.pathFolderToAnalyze);
        showDuration('END LANGUAGE TO JSON ! ', 'greenBright');
        json_ast_to_reports_1.JsonAstToReports.start(pathCommand);
        console.log('IDENTIFIER DURATION', language_to_json_ast_1.LanguageToJsonAst.duration);
        showDuration('END OF END ! ', 'greenBright');
    }
}
exports.Main = Main;
