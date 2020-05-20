"use strict";
exports.__esModule = true;
var tree_folder_model_1 = require("../models/tree-folder.model");
var options_1 = require("../models/options");
var ts_folder_report_service_1 = require("./ts-folder-report.service");
var file_service_1 = require("./file.service");
var ts_file_report_service_1 = require("./ts-file-report.service");
/**
 * Service for reports generation
 */
var ReportsService = /** @class */ (function () {
    function ReportsService() {
    }
    /**
     * Main reports generation process
     * @param treeFolder        // The main folder
     */
    ReportsService.generateAllReports = function (treeFolder) {
        ReportsService.createStyleFiles();
        var parentFolder = new tree_folder_model_1.TreeFolder();
        parentFolder.subFolders.push(treeFolder);
        ReportsService.generateSubfoldersReports(treeFolder);
    };
    /**
     * Generates reports of subFolders recursively
     * @param treeFolder        // The TreeFolder to analyse
     */
    ReportsService.generateSubfoldersReports = function (treeFolder) {
        ReportsService.generateFolderReport(treeFolder);
        for (var _i = 0, _a = treeFolder.subFolders; _i < _a.length; _i++) {
            var subFolder = _a[_i];
            ReportsService.generateSubfoldersReports(subFolder);
        }
    };
    /**
     * Generates a report for a given folder
     * @param treeFolder        // The TreeFolder to analyse
     */
    ReportsService.generateFolderReport = function (treeFolder) {
        var folderReportService = new ts_folder_report_service_1.TsFolderReportService(treeFolder);
        folderReportService.generateReport();
        for (var _i = 0, _a = treeFolder.treeFiles; _i < _a.length; _i++) {
            var file = _a[_i];
            ReportsService.generateFileReport(file);
        }
    };
    /**
     * Generates a report for a given file
     * @param treeFile        // The TreeFile to analyse
     */
    ReportsService.generateFileReport = function (treeFile) {
        var fileReportService = new ts_file_report_service_1.TsFileReportService(treeFile);
        fileReportService.generateReport();
    };
    /**
     * Copy the css files, prism.js and chart.js to a subfolder of the outDir
     */
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
