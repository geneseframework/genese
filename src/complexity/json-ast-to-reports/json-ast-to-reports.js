"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAstToReports = void 0;
const init_service_1 = require("./services/init.service");
const reports_service_1 = require("./services/report/reports.service");
const chalk = require("chalk");
/**
 * Main process jsonAst analysis and reports
 */
class JsonAstToReports {
    /**
     * Starts the analysis
     * @param pathCommand
     * @param jsonAstPath
     */
    static start(pathCommand, jsonAstPath = '/json-ast.json') {
        console.log(chalk.blueBright('STARTS REPORTS GENERATION FROM JSON_AST'));
        console.log('Please wait...');
        const jsonAst = new init_service_1.InitService().generateAllFromJsonAst(JsonAstToReports.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.astFolder.evaluate();
        reports_service_1.ReportsService.generateAllReports(jsonAst);
        console.log(chalk.greenBright('REPORTS GENERATED SUCCESSFULLY'));
        console.log('Please open in your browser the file "folder-report.html" located in your genese reports folder.');
    }
    /**
     * Returns the content of the JsonAst file
     * @param jsonAstPath
     */
    static getJsonAst(jsonAstPath) {
        return require(jsonAstPath);
    }
}
exports.JsonAstToReports = JsonAstToReports;
