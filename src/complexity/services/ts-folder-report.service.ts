import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { TsFolder } from '../models/ts-folder.model';
import { Options } from '../models/options';
import { RowFolderReport } from '../models/row-folder-report.model';
import { RowFileReport } from '../models/row-file-report.model';
import {
    createRelativeDir,
    getFilenameWithoutExtension,
    getRouteBetweenPaths, getRouteFromFolderToFile, getRouteFromFolderToSubFolder,
    getRouteToRoot
} from './file.service';
import { TsFile } from '../models/ts-file.model';
import { MethodReport } from '../models/method-report.model';

const appRoot = require('app-root-path').toString();

export class TsFolderReportService {

    private filesArray: RowFileReport[] = [];
    private foldersArray: RowFolderReport[] = [];
    private isRootFolder = false;
    private methodsArray: RowFileReport[] = [];
    private relativeRootReports = '';
    template: HandlebarsTemplateDelegate;
    tsFolder: TsFolder = undefined;


    constructor(tsFolder: TsFolder) {
        this.tsFolder = tsFolder;
    }


    getFoldersArray(tsFolder: TsFolder): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        if (this.tsFolder.path !== Options.pathFolderToAnalyze) {
            report.push(this.addRowBackToPreviousFolder());
        }
        return report.concat(this.getSubfoldersArray(tsFolder));
    }


    getSubfoldersArray(tsFolder: TsFolder, isSubfolder = false): RowFolderReport[] {
        let report: RowFolderReport[] = [];
        for (const subfolder of tsFolder.subFolders) {
            const subfolderReport: RowFolderReport = {
                complexitiesByStatus: subfolder.getStats().numberOfMethodsByStatus,
                numberOfFiles: subfolder.getStats().numberOfFiles,
                numberOfMethods: subfolder.getStats().numberOfMethods,
                path: subfolder.relativePath,
                routeFromCurrentFolder: getRouteFromFolderToSubFolder(this.tsFolder, subfolder)
            };
            report.push(subfolderReport);
            if (!isSubfolder) {
                report = report.concat(this.getSubfoldersArray(subfolder, true));
            }
        }
        return report;
    }


    addRowBackToPreviousFolder(): RowFolderReport {
        return {
            complexitiesByStatus: undefined,
            numberOfFiles: undefined,
            numberOfMethods: undefined,
            path: '../',
            routeFromCurrentFolder: '..'

        };
    }


    getFilesArray(tsFolder: TsFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const tsFile of tsFolder.tsFiles) {
            for (const tsMethod of tsFile.tsMethods) {
                report.push({
                    cognitiveColor: tsMethod.cognitiveStatus.toLowerCase(),
                    cognitiveValue: tsMethod.cognitiveValue,
                    cyclomaticColor: tsMethod.cyclomaticStatus.toLowerCase(),
                    cyclomaticValue: tsMethod.cyclomaticValue,
                    filename: tsFile.name,
                    linkFile: this.getFileLink(tsFile),
                    methodName: tsMethod.name
                })
            }
        }
        return report;
    }


    getMethodsArraySortedByDecreasingCognitiveCpx(tsFolder: TsFolder): RowFileReport[] {
        const report = this.getMethodsArray(tsFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }


    getMethodsArray(tsFolder: TsFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
        for (const subfolder of tsFolder.subFolders) {
            for (const tsFile of subfolder.tsFiles) {
                for (const tsMethod of tsFile.tsMethods) {
                    report.push({
                        cognitiveColor: tsMethod.cognitiveStatus.toLowerCase(),
                        cognitiveValue: tsMethod.cognitiveValue,
                        cyclomaticColor: tsMethod.cyclomaticStatus.toLowerCase(),
                        cyclomaticValue: tsMethod.cyclomaticValue,
                        filename: tsFile.name,
                        linkFile: this.getFileLink(tsFile),
                        methodName: tsMethod.name
                    })
                }
            }
            report = report.concat(this.getMethodsArray(subfolder));
        }
        return report;
    }


    sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cognitiveValue - a.cognitiveValue);
    }


    getFileLink(tsFile: TsFile): string {
        if (this.tsFolder.relativePath === tsFile.tsFolder?.relativePath) {
            return `./${getFilenameWithoutExtension(tsFile.name)}.html`;
        }
        const route = getRouteFromFolderToFile(this.tsFolder, tsFile);
        return `${route}/${getFilenameWithoutExtension(tsFile.name)}.html`;
    }


    generateReport(): void {
        const parentFolder: TsFolder = new TsFolder();
        parentFolder.subFolders.push(this.tsFolder);
        this.relativeRootReports = getRouteToRoot(this.tsFolder.relativePath);
        this.filesArray = this.getFilesArray(this.tsFolder);
        this.foldersArray = this.getFoldersArray(parentFolder);
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
        const reportTemplate = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/folder-report.handlebars`, 'utf-8'));
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
            stats: this.tsFolder.getStats(),
            thresholds: Options.getThresholds()
        });
        if (this.tsFolder.relativePath) {
            createRelativeDir(this.tsFolder.relativePath);
        }
        const pathReport = `${Options.pathReports}/${this.tsFolder.relativePath}/folder-report.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${appRoot}/src/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
