"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var tree_folder_model_1 = require("../models/tree-folder.model");
var options_1 = require("../models/options");
var file_service_1 = require("./file.service");
var tree_folder_service_1 = require("./tree-folder.service");
var TsFolderReportService = /** @class */ (function () {
    function TsFolderReportService(tsFolder) {
        this.filesArray = [];
        this.foldersArray = [];
        this.isRootFolder = false;
        this.methodsArray = [];
        this.relativeRootReports = '';
        this.treeFolder = undefined;
        this.treeFolder = tsFolder;
        this.treeFolderService = new tree_folder_service_1.TreeFolderService(this.treeFolder);
    }
    TsFolderReportService.prototype.getFoldersArray = function (tsFolder) {
        var report = [];
        if (this.treeFolder.path !== options_1.Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToPreviousFolder());
        }
        return report.concat(this.getSubfoldersArray(tsFolder));
    };
    TsFolderReportService.prototype.getSubfoldersArray = function (tsFolder, isSubfolder) {
        if (isSubfolder === void 0) { isSubfolder = false; }
        var report = [];
        for (var _i = 0, _a = tsFolder.subFolders; _i < _a.length; _i++) {
            var subfolder = _a[_i];
            var subfolderReport = {
                complexitiesByStatus: subfolder.getStats().numberOfMethodsByStatus,
                numberOfFiles: subfolder.getStats().numberOfFiles,
                numberOfMethods: subfolder.getStats().numberOfMethods,
                path: subfolder.relativePath,
                routeFromCurrentFolder: this.treeFolderService.getRouteFromFolderToSubFolder(this.treeFolder, subfolder)
            };
            report.push(subfolderReport);
            if (!isSubfolder) {
                report = report.concat(this.getSubfoldersArray(subfolder, true));
            }
        }
        return report;
    };
    TsFolderReportService.prototype.addRowBackToPreviousFolder = function () {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'
        };
    };
    TsFolderReportService.prototype.getFilesArray = function (tsFolder) {
        var report = [];
        for (var _i = 0, _a = tsFolder.treeFiles; _i < _a.length; _i++) {
            var tsFile = _a[_i];
            for (var _b = 0, _c = tsFile.treeMethods; _b < _c.length; _b++) {
                var treeMethod = _c[_b];
                report.push({
                    cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                    cognitiveValue: treeMethod.cognitiveValue,
                    cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: treeMethod.cyclomaticValue,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: treeMethod.name
                });
            }
        }
        return report;
    };
    TsFolderReportService.prototype.getMethodsArraySortedByDecreasingCognitiveCpx = function (tsFolder) {
        var report = this.getMethodsArray(tsFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    };
    TsFolderReportService.prototype.getMethodsArray = function (tsFolder) {
        var report = [];
        for (var _i = 0, _a = tsFolder.subFolders; _i < _a.length; _i++) {
            var subfolder = _a[_i];
            for (var _b = 0, _c = subfolder.treeFiles; _b < _c.length; _b++) {
                var tsFile = _c[_b];
                for (var _d = 0, _e = tsFile.treeMethods; _d < _e.length; _d++) {
                    var treeMethod = _e[_d];
                    report.push({
                        cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                        cognitiveValue: treeMethod.cognitiveValue,
                        cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: treeMethod.cyclomaticValue,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: treeMethod.name
                    });
                }
            }
            report = report.concat(this.getMethodsArray(subfolder));
        }
        return report;
    };
    TsFolderReportService.prototype.sortByDecreasingCognitiveCpx = function (methodsReport) {
        return methodsReport.sort(function (a, b) { return b.cognitiveValue - a.cognitiveValue; });
    };
    TsFolderReportService.prototype.getFileLink = function (tsFile) {
        var _a;
        if (this.treeFolder.relativePath === ((_a = tsFile.treeFolder) === null || _a === void 0 ? void 0 : _a.relativePath)) {
            return "./" + file_service_1.getFilenameWithoutExtension(tsFile.name) + ".html";
        }
        var route = this.treeFolderService.getRouteFromFolderToFile(this.treeFolder, tsFile);
        return route + "/" + file_service_1.getFilenameWithoutExtension(tsFile.name) + ".html";
    };
    TsFolderReportService.prototype.generateReport = function () {
        var parentFolder = new tree_folder_model_1.TreeFolder();
        parentFolder.subFolders.push(this.treeFolder);
        this.relativeRootReports = file_service_1.getRouteToRoot(this.treeFolder.relativePath);
        this.filesArray = this.getFilesArray(this.treeFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        var reportTemplate = eol.auto(fs.readFileSync(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/handlebars/folder-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    TsFolderReportService.prototype.writeReport = function () {
        var template = this.template({
            colors: options_1.Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            isRootFolder: this.isRootFolder,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.treeFolder.getStats(),
            thresholds: options_1.Options.getThresholds()
        });
        if (this.treeFolder.relativePath) {
            file_service_1.createRelativeDir(this.treeFolder.relativePath);
        }
        var pathReport = options_1.Options.pathOutDir + "/" + this.treeFolder.relativePath + "/folder-report.html";
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    };
    TsFolderReportService.prototype.registerPartial = function (partialName, filename) {
        var partial = eol.auto(fs.readFileSync(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/handlebars/" + filename + ".handlebars", 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    };
    return TsFolderReportService;
}());
exports.TsFolderReportService = TsFolderReportService;
