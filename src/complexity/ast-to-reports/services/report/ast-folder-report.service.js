"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFolderReportService = void 0;
const fs = require("fs-extra");
const eol = require("eol");
const Handlebars = require("handlebars");
const options_1 = require("../../models/options");
const file_service_1 = require("../../../core/services/file.service");
const ast_folder_model_1 = require("../../models/ast/ast-folder.model");
const ast_folder_service_1 = require("../ast/ast-folder.service");
/**
 * Service generating folders reports
 */
class AstFolderReportService {
    constructor(astFolder) {
        this.filesArray = []; // The array of files reports
        this.foldersArray = []; // The array of subfolders reports
        this.isRootFolder = false; // True if the AstFolder relative to this service is the root folder of the analysis
        this.methodsArray = []; // The array of methods reports
        this.relativeRootReports = ''; // The route between the position of the current TsFolder and the root of the analysis
        this.astFolder = undefined; // The AstFolder relative to this service
        this.astFolderService = new ast_folder_service_1.AstFolderService(); // The service relative to AstFolders
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }
    /**
     * Returns the array of subfolders with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    getFoldersArray(astFolder) {
        let report = [];
        if (this.astFolder.path !== options_1.Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToParentFolder());
        }
        return report.concat(this.getSubfoldersArray(astFolder));
    }
    /**
     * Recursion returning the array of subfolders reports
     * @param astFolder        // The AstFolder to analyse
     * @param isSubfolder       // True if astFolder is a subfolder (used for recursivity)
     */
    getSubfoldersArray(astFolder, isSubfolder = false) {
        let report = [];
        for (const subfolder of astFolder.children) {
            const subfolderReport = {
                complexitiesByStatus: subfolder.stats.numberOfMethodsByStatus,
                numberOfFiles: subfolder.stats.numberOfFiles,
                numberOfMethods: subfolder.stats.numberOfMethods,
                path: subfolder.relativePath,
                routeFromCurrentFolder: this.astFolderService.getRouteFromFolderToSubFolder(this.astFolder, subfolder)
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
     * @param astFolder    // The AstFolder to analyse
     */
    getFilesArray(astFolder) {
        let report = [];
        for (const tsFile of astFolder.astFiles) {
            for (const astMethod of tsFile.astMethods) {
                report.push({
                    cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                    cpxIndex: astMethod.cpxIndex,
                    cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: astMethod.cyclomaticCpx,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: astMethod.name
                });
            }
        }
        return report;
    }
    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(astFolder) {
        const report = this.getMethodsArray(astFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }
    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArray(astFolder) {
        let report = [];
        for (const subfolder of astFolder.children) {
            for (const tsFile of subfolder.astFiles) {
                for (const astMethod of tsFile.astMethods) {
                    report.push({
                        cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                        cpxIndex: astMethod.cpxIndex,
                        cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: astMethod.cyclomaticCpx,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: astMethod.name
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
     * Returns the path to the report's page of a given AstFile
     * @param astFile
     */
    getFileLink(astFile) {
        var _a;
        if (this.astFolder.relativePath === ((_a = astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath)) {
            return `./${file_service_1.getFilenameWithoutExtension(astFile.name)}.html`;
        }
        const route = this.astFolderService.getRouteFromFolderToFile(this.astFolder, astFile);
        return `${route}/${file_service_1.getFilenameWithoutExtension(astFile.name)}.html`;
    }
    /**
     * Generates the folder's report
     */
    generateReport() {
        const parentFolder = new ast_folder_model_1.AstFolder();
        parentFolder.children.push(this.astFolder);
        this.relativeRootReports = file_service_1.getRouteToRoot(this.astFolder.relativePath);
        this.filesArray = this.getFilesArray(this.astFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/handlebars/folder-report.handlebars`, 'utf-8'));
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
            stats: this.astFolder.stats,
            thresholds: options_1.Options.getThresholds()
        });
        if (this.astFolder.relativePath) {
            file_service_1.createRelativeDir(this.astFolder.relativePath);
        }
        const pathReport = `${options_1.Options.pathOutDir}/${this.astFolder.relativePath}/folder-report.html`;
        console.log('PATH REPORT', pathReport);
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }
    /**
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    registerPartial(partialName, filename) {
        const partial = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
exports.AstFolderReportService = AstFolderReportService;
