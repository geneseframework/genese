"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAstToReports = void 0;
const init_service_1 = require("./services/init.service");
const file_service_1 = require("../core/services/file.service");
const reports_service_1 = require("./services/report/reports.service");
const chalk = require("chalk");
const options_model_1 = require("../core/models/options.model");
/**
 * Main process jsonAst analysis and reports
 */
class JsonAstToReports {
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    static start(pathCommand, pathToAnalyze, pathGeneseNodeJs, jsonAstPath = '/json-ast.json') {
        console.log(chalk.blueBright('START REPORTS GENERATION'));
        options_model_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        const jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        reports_service_1.ReportsService.generateAllReports(jsonAst);
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open the file folder-report.html in your browser');
    }
    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    static getJsonAst(jsonAstPath) {
        const jsonAst = require(jsonAstPath);
        return jsonAst;
    }
}
exports.JsonAstToReports = JsonAstToReports;
