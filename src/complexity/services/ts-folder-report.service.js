"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const eol = require("eol");
const Handlebars = require("handlebars");
const tree_folder_model_1 = require("../models/tree-folder.model");
const options_1 = require("../models/options");
const file_service_1 = require("./file.service");
const tree_folder_service_1 = require("./tree-folder.service");
class TsFolderReportService {
    constructor(tsFolder) {
        this.filesArray = [];
        this.foldersArray = [];
        this.isRootFolder = false;
        this.methodsArray = [];
        this.relativeRootReports = '';
        this.treeFolder = undefined;
        this.treeFolder = tsFolder;
        this.treeFolderService = new tree_folder_service_1.TreeFolderService(this.treeFolder);
    }
    getFoldersArray(tsFolder) {
        let report = [];
        if (this.treeFolder.path !== options_1.Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToPreviousFolder());
        }
        return report.concat(this.getSubfoldersArray(tsFolder));
    }
    getSubfoldersArray(tsFolder, isSubfolder = false) {
        let report = [];
        for (const subfolder of tsFolder.subFolders) {
            const subfolderReport = {
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
    }
    addRowBackToPreviousFolder() {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'
        };
    }
    getFilesArray(tsFolder) {
        let report = [];
        for (const tsFile of tsFolder.treeFiles) {
            for (const treeMethod of tsFile.treeMethods) {
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
    }
    getMethodsArraySortedByDecreasingCognitiveCpx(tsFolder) {
        const report = this.getMethodsArray(tsFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }
    getMethodsArray(tsFolder) {
        let report = [];
        for (const subfolder of tsFolder.subFolders) {
            for (const tsFile of subfolder.treeFiles) {
                for (const treeMethod of tsFile.treeMethods) {
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
    }
    sortByDecreasingCognitiveCpx(methodsReport) {
        return methodsReport.sort((a, b) => b.cognitiveValue - a.cognitiveValue);
    }
    getFileLink(tsFile) {
        var _a;
        if (this.treeFolder.relativePath === ((_a = tsFile.treeFolder) === null || _a === void 0 ? void 0 : _a.relativePath)) {
            return `./${file_service_1.getFilenameWithoutExtension(tsFile.name)}.html`;
        }
        const route = this.treeFolderService.getRouteFromFolderToFile(this.treeFolder, tsFile);
        return `${route}/${file_service_1.getFilenameWithoutExtension(tsFile.name)}.html`;
    }
    generateReport() {
        const parentFolder = new tree_folder_model_1.TreeFolder();
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
        const reportTemplate = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/folder-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }
    writeReport() {
        const template = this.template({
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
        const pathReport = `${options_1.Options.pathOutDir}/${this.treeFolder.relativePath}/folder-report.html`;
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }
    registerPartial(partialName, filename) {
        const partial = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
exports.TsFolderReportService = TsFolderReportService;
