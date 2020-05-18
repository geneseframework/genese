"use strict";
exports.__esModule = true;
var tree_folder_model_1 = require("../models/tree-folder.model");
var options_1 = require("../models/options");
var ts_folder_report_service_1 = require("./ts-folder-report.service");
var file_service_1 = require("./file.service");
var ts_file_report_service_1 = require("./ts-file-report.service");
var ReportsService = /** @class */ (function () {
    function ReportsService() {
    }
    ReportsService.generateAllReports = function (tsFolder) {
        ReportsService.createStyleFiles();
        var parentFolder = new tree_folder_model_1.TreeFolder();
        parentFolder.subFolders.push(tsFolder);
        ReportsService.generateSubfoldersReports(tsFolder);
    };
    ReportsService.generateSubfoldersReports = function (tsFolder) {
        ReportsService.generateFolderReport(tsFolder);
        for (var _i = 0, _a = tsFolder.subFolders; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            ReportsService.generateSubfoldersReports(subFolder);
        }
    };
    ReportsService.generateFolderReport = function (tsFolder) {
        var folderReportService = new ts_folder_report_service_1.TsFolderReportService(tsFolder);
        folderReportService.generateReport();
        for (var _i = 0, _a = tsFolder.tsFiles; _i < _a.length; _i++) {
            var file = _a[_i];
            ReportsService.generateFileReport(file);
        }
    };
    ReportsService.generateFileReport = function (tsFile) {
        var fileReportService = new ts_file_report_service_1.TsFileReportService(tsFile);
        fileReportService.generateReport();
    };
    ReportsService.createStyleFiles = function () {
        file_service_1.createRelativeDir('reports-styles');
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/styles/report.css", options_1.Options.pathOutDir + "/reports-styles/report.css");
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/styles/styles.css", options_1.Options.pathOutDir + "/reports-styles/styles.css");
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/styles/prettify.css", options_1.Options.pathOutDir + "/reports-styles/prettify.css");
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/styles/prism.css", options_1.Options.pathOutDir + "/reports-styles/prism.css");
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/styles/prism.js", options_1.Options.pathOutDir + "/reports-styles/prism.js");
        file_service_1.copyFile(options_1.Options.pathGeneseNodeJs + "/node_modules/chart.js/dist/Chart.js", options_1.Options.pathOutDir + "/reports-styles/Chart.js");
    };
    return ReportsService;
}());
exports.ReportsService = ReportsService;
