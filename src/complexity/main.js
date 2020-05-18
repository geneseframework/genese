"use strict";
exports.__esModule = true;
var options_1 = require("./models/options");
var file_service_1 = require("./services/file.service");
var reports_service_1 = require("./services/reports.service");
var tree_folder_service_1 = require("./services/tree-folder.service");
var ansi_colors_1 = require("ansi-colors");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.start = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        console.log('START CALCULATION');
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        var tsFolder = tree_folder_service_1.TreeFolderService.generateTree(options_1.Options.pathFolderToAnalyze, 'ts');
        reports_service_1.ReportsService.generateAllReports(tsFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    };
    return Main;
}());
exports.Main = Main;
