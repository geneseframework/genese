import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import { RowFolderReport } from '../../models/report/row-folder-report.model';
import { RowFileReport } from '../../models/report/row-file-report.model';
import {
    constructLink,
    createRelativeDir,
    deleteLastSlash,
    getFilenameWithoutExtension,
    getPathWithSlash,
    getRouteToRoot,
} from '../../../core/services/file.service';
import { AstFile } from '../../models/ast/ast-file.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderService } from '../ast/ast-folder.service';
import { Options } from '../../../core/models/options.model';

/**
 * Service generating folders reports
 */
export class AstFolderReportService {

    astFolder: AstFolder = undefined;                                       // The AstFolder relative to this service
    astFolderService: AstFolderService = new AstFolderService();            // The service relative to AstFolders
    private filesArray: RowFileReport[] = [];                               // The array of files reports
    private foldersArray: RowFolderReport[] = [];                           // The array of subFolders reports
    private isRootFolder = false;                                           // True if the AstFolder relative to this service is the root folder of the analysis
    private methodsArray: RowFileReport[] = [];                             // The array of methods reports
    private relativeRootReports = '';                                       // The route between the pos of the current TsFolder and the root of the analysis
    template: HandlebarsTemplateDelegate = undefined;                       // The HandleBar template used to generate the report

    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }

    /**
     * Generates the folder's report
     */
    generateReport(): void {
        const parentFolder: AstFolder = new AstFolder();
        parentFolder.children.push(this.astFolder);
        this.relativeRootReports = getRouteToRoot(this.astFolder.relativePath);
        this.setFilesArray(this.astFolder);
        this.setFoldersArray(parentFolder);
        this.methodsArray = this.astFolderService.getMethodsArraySortedByDecreasingCognitiveCpx(parentFolder);
        this.setPartials();
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/folder-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }

    /**
     * Sets the array of subFolders with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    private setFoldersArray(astFolder: AstFolder): void {
        if (getPathWithSlash(this.astFolder.path) !== getPathWithSlash(Options.pathFolderToAnalyze)) {
            this.foldersArray.push(this.getFolderReportRow(astFolder, true));
        }
        this.setSubFoldersArray(astFolder);
    }


    /**
     * Recursion setting the array of subFolders reports
     * @param astFolder        // The AstFolder to analyse
     * @param iSubFolder       // True if astFolder is a subFolder (used for recursivity)
     */
    private setSubFoldersArray(astFolder: AstFolder, isSubFolder = false): void {
        for (const subFolder of astFolder.children) {
            if (subFolder.relativePath !== '') {
                this.foldersArray.push(this.getFolderReportRow(subFolder));
            }
            if (!isSubFolder) {
                this.setSubFoldersArray(subFolder, true);
            }
        }
    }

    /**
     * Gets the folder report row 
     * @param subFolder         // The subFolder to parse
     * @param parentFolder      // Is the folder the root 
     */
    private getFolderReportRow(subFolder: AstFolder, parentFolder = false): RowFolderReport{
        if(parentFolder){
            return {
                complexitiesByStatus: undefined,
                numberOfFiles: undefined,
                numberOfMethods: undefined,
                path: '../',
                routeFromCurrentFolder: '..'
            };
        }
        const routeFromCurrentFolderBase = this.astFolderService.getRouteFromFolderToSubFolder(
            this.astFolder,
            subFolder
        );
        return {
            complexitiesByStatus: subFolder.stats?.numberOfMethodsByStatus,
            numberOfFiles: subFolder.stats?.numberOfFiles,
            numberOfMethods: subFolder.stats?.numberOfMethods,
            path: subFolder.relativePath,
            routeFromCurrentFolder: deleteLastSlash(
                routeFromCurrentFolderBase
            ),
        };
    }


    /**
     * Sets the array of files with their analysis
     * @param astFolder    // The AstFolder to analyse
     */
    private setFilesArray(astFolder: AstFolder): void {
        for (const tsFile of astFolder.astFiles) {
            this.setAstMethodReport(tsFile)
        }
        this.filesArray.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }

    /**
     * Sets the astMethodReport
     * @param astFile       // The file to analyse
     */
    private setAstMethodReport(astFile: AstFile): void{
        for (const astMethod of astFile.astMethods) {
            this.filesArray.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: this.getFileLink(astFile),
                methodName: astMethod.name
            });
        }
    }

    /**
     * Returns the path to the report's page of a given AstFile
     * @param astFile
     */
    private getFileLink(astFile: AstFile): string {
        if (this.astFolder.relativePath === astFile.astFolder?.relativePath) {
            return `./${getFilenameWithoutExtension(astFile.name)}.html`;
        }
        const route = this.astFolderService.getRouteFromFolderToFile(
            this.astFolder,
            astFile
        );
        return `${deleteLastSlash(route)}/${getFilenameWithoutExtension(
            astFile.name
        )}.html`;
    }

    /**
     * Fills the HandleBar's template
     */
    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            filesArray: this.filesArray,
            foldersArray: this.foldersArray,
            isRootFolder: this.isRootFolder,
            methodsArray: this.methodsArray,
            relativeRootReports: this.relativeRootReports,
            stats: this.astFolder.stats,
            thresholds: Options.getThresholds()
        });
        if (this.astFolder.relativePath) {
            createRelativeDir(this.astFolder.relativePath);
        }
        const pathOutDir = constructLink(Options.pathOutDir);
        const relativePath = constructLink(this.astFolder.relativePath);
        const pathReport = `${deleteLastSlash(pathOutDir)}/${deleteLastSlash(
            relativePath
        )}/folder-report.html`;
        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Sets the HandleBar's partials
     */
    private setPartials(): void{
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("rowFolder", 'row-folders');
        this.registerPartial("rowFile", 'row-files');
    }

    /**
     * Registers a HandleBar's partial
     * @param partialName
     * @param filename
     */
    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
