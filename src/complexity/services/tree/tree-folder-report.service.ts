import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { TreeFolder } from '../../models/tree/tree-folder.model';
import { Options } from '../../models/options';
import { RowFolderReport } from '../../models/report/row-folder-report.model';
import { RowFileReport } from '../../models/report/row-file-report.model';
import { createRelativeDir, getFilenameWithoutExtension, getRouteToRoot } from '../file.service';
import { TreeFile } from '../../models/tree/tree-file.model';
import { MethodReport } from '../../models/report/method-report.model';
import { TreeFolderService } from './tree-folder.service';

/**
 * Service generating folders reports
 */
export class TreeFolderReportService {

    private filesArray: RowFileReport[] = [];                               // The array of files reports
    private foldersArray: RowFolderReport[] = [];                           // The array of subfolders reports
    private isRootFolder = false;                                           // True if the TreeFolder relative to this service is the root folder of the analysis
    private methodsArray: RowFileReport[] = [];                             // The array of methods reports
    private relativeRootReports = '';                                       // The route between the position of the current TsFolder and the root of the analysis
    template: HandlebarsTemplateDelegate;                                   // The HandleBar template used to generate the report
    treeFolder: TreeFolder = undefined;                                     // The TreeFolder relative to this service
    treeFolderService: TreeFolderService = new TreeFolderService();         // The service relative to TreeFolders


    constructor(treeFolder: TreeFolder) {
        this.treeFolder = treeFolder;
        this.treeFolderService.treeFolder = this.treeFolder;
    }


    /**
     * Returns the array of subfolders with their analysis
     * @param treeFolder    // The TreeFolder to analyse
     */
    getFoldersArray(treeFolder: TreeFolder): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        if (this.treeFolder.path !== Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToParentFolder());
        }
        return report.concat(this.getSubfoldersArray(treeFolder));
    }


    /**
     * Recursion returning the array of subfolders reports
     * @param treeFolder        // The TreeFolder to analyse
     * @param isSubfolder       // True if treeFolder is a subfolder (used for recursivity)
     */
    getSubfoldersArray(treeFolder: TreeFolder, isSubfolder = false): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        for (const subfolder of treeFolder.subFolders) {
            const subfolderReport: RowFolderReport = {
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
    addRowBackToParentFolder(): RowFolderReport {
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
    getFilesArray(treeFolder: TreeFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const tsFile of treeFolder.treeFiles) {
            for (const treeMethod of tsFile.treeMethods) {
                report.push({
                    cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                    cognitiveValue: treeMethod.cognitiveValue,
                    cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: treeMethod.cyclomaticCpx,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: treeMethod.name
                })
            }
        }
        return report;
    }


    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param treeFolder    // The TreeFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(treeFolder: TreeFolder): RowFileReport[] {
        const report = this.getMethodsArray(treeFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }


    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param treeFolder    // The TreeFolder to analyse
     */
    getMethodsArray(treeFolder: TreeFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const subfolder of treeFolder.subFolders) {
            for (const tsFile of subfolder.treeFiles) {
                for (const treeMethod of tsFile.treeMethods) {
                    report.push({
                        cognitiveColor: treeMethod.cognitiveStatus.toLowerCase(),
                        cognitiveValue: treeMethod.cognitiveValue,
                        cyclomaticColor: treeMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: treeMethod.cyclomaticCpx,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: treeMethod.name
                    })
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
    sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cognitiveValue - a.cognitiveValue);
    }


    /**
     * Returns the path to the report's page of a given TreeFile
     * @param treeFile
     */
    getFileLink(treeFile: TreeFile): string {
        if (this.treeFolder.relativePath === treeFile.treeFolder?.relativePath) {
            return `./${getFilenameWithoutExtension(treeFile.name)}.html`;
        }
        const route = this.treeFolderService.getRouteFromFolderToFile(this.treeFolder, treeFile);
        return `${route}/${getFilenameWithoutExtension(treeFile.name)}.html`;
    }


    /**
     * Generates the folder's report
     */
    generateReport(): void {
        const parentFolder: TreeFolder = new TreeFolder();
        parentFolder.subFolders.push(this.treeFolder);
        this.relativeRootReports = getRouteToRoot(this.treeFolder.relativePath);
        this.filesArray = this.getFilesArray(this.treeFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/folder-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            isRootFolder: this.isRootFolder,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.treeFolder.getStats(),
            thresholds: Options.getThresholds()
        });
        if (this.treeFolder.relativePath) {
            createRelativeDir(this.treeFolder.relativePath);
        }
        const pathReport = `${Options.pathOutDir}/${this.treeFolder.relativePath}/folder-report.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
