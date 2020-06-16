"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainAst = exports.DEBUG = void 0;
const file_service_1 = require("../old/services/file.service");
const ansi_colors_1 = require("ansi-colors");
const fs = require("fs-extra");
const init_service_1 = require("./services/init.service");
const options_1 = require("./models/options");
const reports_service_1 = require("./services/report/reports.service");
exports.DEBUG = true; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file
/**
 * MainConvertTs process of the analysis
 */
class MainAst {
    constructor() {
        this.initService = new init_service_1.InitService(); // The service managing TreeFolders
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     * @param jsonAstPath
     */
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs, jsonAstPath = '/ast.json') {
        console.log('START CALCULATION');
        // this.createSyntaxKindEnum();
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        // Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        file_service_1.createOutDir();
        const jsonAst = this.initService.generateAllFromJsonAst(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.evaluate();
        reports_service_1.ReportsService.generateAllReports(jsonAst);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
    getJsonAst(jsonAstPath) {
        const jsonAst = require(jsonAstPath);
        // TODO : check if the JSON is correct
        return jsonAst;
    }
    createSyntaxKindEnum() {
        const sk = require('./ast/enums/syntax-kind-old.enum');
        const newSkEnum = new sk.SK();
        let text = 'export enum SyntaxKind {\n';
        for (const key of Object.keys(newSkEnum)) {
            text = `${text}\t${key} = '${key}',\n`;
        }
        text = text.slice(0, -2);
        text = `\n\n${text}}\n`;
        fs.writeFileSync('./syntaxkind.ts', text, { encoding: 'utf-8' });
    }
}
exports.MainAst = MainAst;
