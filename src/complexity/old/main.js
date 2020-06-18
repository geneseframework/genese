"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = exports.DEBUG = void 0;
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const reports_service_1 = require("./services/report/reports.service");
const ansi_colors_1 = require("ansi-colors");
const tree_folder_service_1 = require("./services/tree/tree-folder.service");
const language_enum_1 = require("../core/enum/language.enum");
exports.DEBUG = false; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND when you want to get stats only for debug.mock.ts file
/**
 * MainConvertTs process of the analysis
 */
class Main {
    constructor() {
        this.treeFolderService = new tree_folder_service_1.TreeFolderService(); // The service managing TreeFolders
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
        const treeFolder = this.treeFolderService.generateTree(options_1.Options.pathFolderToAnalyze, language_enum_1.Language.TS);
        reports_service_1.ReportsService.generateAllReports(treeFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
}
exports.Main = Main;
