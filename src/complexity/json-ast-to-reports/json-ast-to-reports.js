"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAstToReports = void 0;
const ansi_colors_1 = require("ansi-colors");
const init_service_1 = require("./services/init.service");
const options_1 = require("./models/options");
const file_service_1 = require("../core/services/file.service");
const reports_service_1 = require("./services/report/reports.service");
const chalk = require("chalk");
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
    static start(pathCommand, pathToAnalyze, pathGeneseNodeJs, jsonAstPath = '/ast-ts.json') {
        console.log(chalk.blueBright('START REPORTS GENERATION'));
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        const jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        reports_service_1.ReportsService.generateAllReports(jsonAst);
        console.log(ansi_colors_1.blueBright('REPORTS GENERATED SUCCESSFULLY'));
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
