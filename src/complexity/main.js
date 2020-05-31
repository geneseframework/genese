"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const reports_service_1 = require("./services/reports.service");
const tree_folder_service_1 = require("./services/tree-folder.service");
const ansi_colors_1 = require("ansi-colors");
exports.DEBUG = true; // Set to true when you use Genese Complexity in DEBUG mode (with npm run debug) AND with stats only for debug.mock.ts
/**
 * Main process of the analysis
 */
class Main {
    constructor() {
        this.treeFolderService = new tree_folder_service_1.TreeFolderService();
    }
    /**
     * Starts the analysis
     * @param pathCommand
     * @param pathToAnalyze
     * @param pathGeneseNodeJs
     */
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        console.log('START CALCULATION');
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        const tsFolder = this.treeFolderService.generateTree(options_1.Options.pathFolderToAnalyze, 'ts');
        reports_service_1.ReportsService.generateAllReports(tsFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
}
exports.Main = Main;
