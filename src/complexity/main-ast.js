"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const reports_service_1 = require("./services/report/reports.service");
const ansi_colors_1 = require("ansi-colors");
const language_enum_1 = require("./ast/enums/language.enum");
const ast_folder_service_1 = require("./ast/services/ast-folder.service");
exports.DEBUG = true; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file
/**
 * Main process of the analysis
 */
class Main {
    constructor() {
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service managing TreeFolders
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     */
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs, language) {
        console.log('START CALCULATION');
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        const asTFolder = this.astFolderService.generateAstFolders(options_1.Options.pathFolderToAnalyze, language_enum_1.Language.TS);
        // const treeFolder = this.treeFolderService.generateAstFolders(Options.pathFolderToAnalyze, Language.TS);
        reports_service_1.ReportsService.generateAllReports(asTFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
}
exports.Main = Main;
