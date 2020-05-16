"use strict";
exports.__esModule = true;
var ts_folder_model_1 = require("./models/ts-folder.model");
var options_1 = require("./models/options");
var file_service_1 = require("./services/file.service");
var reports_service_1 = require("./services/reports.service");
var ts_folder_service_1 = require("./services/ts-folder.service");
var ts_file_service_1 = require("./services/ts-file.service");
var Main = /** @class */ (function () {
    function Main() {
        this.tsFolder = new ts_folder_model_1.TsFolder();
    }
    Main.prototype.start = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        console.log('START CALCULATION');
        console.log('args received', pathToAnalyze);
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        console.log('OPTIONS', options_1.Options);
        // this.getDebugReport(pathCommand);
        // this.setoptions(pathtoanalyse)
        this.createOutDir()
            .generateTree()
            .generateReports();
        console.log('COMPLEXITY REPORT GENERATED SUCCESSFULLY');
    };
    // setoptions(pathcommand: string, pathtoanalyse: string): main {
    //     options.setoptions(pathcommand, pathtoanalyse);
    //     return this;
    // }
    Main.prototype.createOutDir = function () {
        file_service_1.createOutDir();
        return this;
    };
    Main.prototype.getDebugReport = function (pathCommand) {
        var tsFile = ts_file_service_1.TsFileService.generateTree(pathCommand + "/src/mocks/ast.mock.ts");
        // for (const method of tsFile.tsmethods) {
        //     const tree = method.tstree;
        // tree.printallchildren();
        // }
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
