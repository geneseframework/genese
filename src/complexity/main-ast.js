"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const ansi_colors_1 = require("ansi-colors");
const ast_folder_service_1 = require("./ast/services/ast-folder.service");
exports.DEBUG = true; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file
/**
 * MainAst process of the analysis
 */
class MainAst {
    constructor() {
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service managing TreeFolders
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param geneseConfigPath
     * @param jsonAstPath
     */
    start(pathCommand, geneseConfigPath = '/geneseconfig.json', jsonAstPath = '/ast.json') {
        console.log('START CALCULATION');
        options_1.Options.setOptionsFromConfig(pathCommand + geneseConfigPath);
        file_service_1.createOutDir();
        const jsonAst = this.astFolderService.generateAstFolders(this.getJsonAst(pathCommand + jsonAstPath));
        // ReportsService.generateAllReports(astFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
    getJsonAst(jsonAstPath) {
        const jsonAst = require(jsonAstPath);
        // TODO : check if the JSON is correct
        return jsonAst;
    }
}
exports.MainAst = MainAst;
