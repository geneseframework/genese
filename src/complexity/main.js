"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const reports_service_1 = require("./services/reports.service");
const tree_folder_service_1 = require("./services/tree-folder.service");
const ansi_colors_1 = require("ansi-colors");
exports.DEBUG = false; // Set to true to use Genese Complexity in DEBUG mode (with npm run debug)
/**
 * Main process of the analysis
 */
class Main {
    constructor() {
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
        const tsFolder = tree_folder_service_1.TreeFolderService.generateTree(options_1.Options.pathFolderToAnalyze, 'ts');
        reports_service_1.ReportsService.generateAllReports(tsFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
}
exports.Main = Main;
