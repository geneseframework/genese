"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const file_service_1 = require("./core/services/file.service");
const options_model_1 = require("./core/models/options.model");
const language_to_json_ast_1 = require("./languages-to-json-ast/language-to-json-ast");
const json_ast_to_reports_1 = require("./json-ast-to-reports/json-ast-to-reports");
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
        language_to_json_ast_1.LanguageToJsonAst.start(options_model_1.Options.pathFolderToAnalyze);
        json_ast_to_reports_1.JsonAstToReports.start(pathCommand);
    }
}
exports.Main = Main;
