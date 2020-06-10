"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const eol = require("eol");
const Handlebars = require("handlebars");
const tree_folder_model_1 = require("../../models/tree/tree-folder.model");
const options_1 = require("../../models/options");
const file_service_1 = require("../file.service");
const tree_folder_service_1 = require("../tree/tree-folder.service");
/**
 * Service generating folders reports
 */
class TreeFolderReportService {
    constructor(treeFolder) {
        this.filesArray = []; // The array of files reports
        this.foldersArray = []; // The array of subfolders reports
        this.isRootFolder = false; // True if the TreeFolder relative to this service is the root folder of the analysis
        this.methodsArray = []; // The array of methods reports
        this.relativeRootReports = ''; // The route between the position of the current TsFolder and the root of the analysis
        this.treeFolder = undefined; // The TreeFolder relative to this service
        this.treeFolderService = new tree_folder_service_1.TreeFolderService(); // The service relative to TreeFolders
        this.treeFolder = treeFolder;
        this.treeFolderService.treeFolder = this.treeFolder;
    }
    /**
     * Returns the array of subfolders with their analysis
     * @param treeFolder    // The TreeFolder to analyse
     */
    getFoldersArray(treeFolder) {
        let report = [];
        if (this.treeFolder.path !== options_1.Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToParentFolder());
        }
        return report.concat(this.getSubfoldersArray(treeFolder));
    }
    /**
     * Recursion returning the array of subfolders reports
     * @param treeFolder        // The TreeFolder to analyse
     * @param isSubfolder       // True if treeFolder is a subfolder (used for recursivity)
     */
    getSubfoldersArray(treeFolder, isSubfolder = false) {
        let report = [];
        for (const subfolder of treeFolder.subFolders) {
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
    /**
     * Adds a backlink to the parent folder
     */
    addRowBackToParentFolder() {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'
        };
    }
    /**
     * Returns the array of files with their analysis
     * @param treeFolder    // The TreeFolder to analyse
     */
    getFilesArray(treeFolder) {
        let report = [];
        for (const tsFile of treeFolder.treeFiles) {
            for (const treeMethod of tsFile.treeMethods) {
                report.push({
                    cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                    cpxIndex: treeMethod.cpxIndex,
                    cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: treeMethod.cyclomaticCpx,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: treeMethod.name
                });
            }
        }
        return report;
    }
    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param treeFolder    // The TreeFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(treeFolder) {
        const report = this.getMethodsArray(treeFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }
    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param treeFolder    // The TreeFolder to analyse
     */
    getMethodsArray(treeFolder) {
        let report = [];
        for (const subfolder of treeFolder.subFolders) {
            for (const tsFile of subfolder.treeFiles) {
                for (const treeMethod of tsFile.treeMethods) {
                    report.push({
                        cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                        cpxIndex: treeMethod.cpxIndex,
                        cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: treeMethod.cyclomaticCpx,
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
    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    sortByDecreasingCognitiveCpx(methodsReport) {
        return methodsReport.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }
    /**
     * Returns the path to the report's page of a given TreeFile
     * @param treeFile
     */
    getFileLink(treeFile) {
        var _a;
        if (this.treeFolder.relativePath === ((_a = treeFile.treeFolder) === null || _a === void 0 ? void 0 : _a.relativePath)) {
            return `./${file_service_1.getFilenameWithoutExtension(treeFile.name)}.html`;
        }
        const route = this.treeFolderService.getRouteFromFolderToFile(this.treeFolder, treeFile);
        return `${route}/${file_service_1.getFilenameWithoutExtension(treeFile.name)}.html`;
    }
    /**
     * Generates the folder's report
     */
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
    /**
     * Fills the HandleBar's template
     */
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
    /**
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    registerPartial(partialName, filename) {
        const partial = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
exports.TreeFolderReportService = TreeFolderReportService;
