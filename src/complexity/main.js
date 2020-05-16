"use strict";
exports.__esModule = true;
var ts_folder_model_1 = require("./models/ts-folder.model");
var options_1 = require("./models/options");
var file_service_1 = require("./services/file.service");
var reports_service_1 = require("./services/reports.service");
var ts_folder_service_1 = require("./services/ts-folder.service");
var ansi_colors_1 = require("ansi-colors");
var Main = /** @class */ (function () {
    function Main() {
        this.tsFolder = new ts_folder_model_1.TsFolder();
    }
    Main.prototype.start = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        console.log('START CALCULATION');
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        this.createOutDir()
            .generateTree()
            .generateReports();
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    };
    Main.prototype.createOutDir = function () {
        file_service_1.createOutDir();
        return this;
    };
    Main.prototype.generateTree = function () {
        this.tsFolder = ts_folder_service_1.TsFolderService.generateTree(options_1.Options.pathFolderToAnalyze, 'ts');
        return this;
    };
    Main.prototype.generateReports = function () {
        reports_service_1.ReportsService.generateAllReports(this.tsFolder);
    };
    return Main;
}());
exports.Main = Main;
