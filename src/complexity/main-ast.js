"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const ansi_colors_1 = require("ansi-colors");
const init_service_1 = require("./ast/services/init.service");
const fs = require("fs-extra");
exports.DEBUG = true; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file
/**
 * MainAst process of the analysis
 */
class MainAst {
    constructor() {
        this.initService = new init_service_1.InitService(); // The service managing TreeFolders
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param geneseConfigPath
     * @param jsonAstPath
     */
    start(pathCommand, geneseConfigPath = '/geneseconfig.json', jsonAstPath = '/ast.json') {
        console.log('START CALCULATION');
        // this.createSyntaxKindEnum();
        options_1.Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        file_service_1.createOutDir();
        const jsonAst = this.initService.generateAstFolders(this.getJsonAst(pathCommand + jsonAstPath));
        jsonAst.evaluate();
        // ReportsService.generateAllReports(astFolder);
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
