import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import { RowFileReport } from '../../models/report/row-file-report.model';
import {
    constructLink,
    createRelativeDir,
    deleteLastSlash,
    getFilenameWithoutExtension
} from '../../../core/services/file.service';
import { MethodReport } from '../../models/report/method-report.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFolderService } from '../ast/ast-folder.service';
import { Options } from '../../../core/models/options.model';

/**
 * Service generating folders reports
 */
export class AstFolderMarkdownReportService {

    astFolder: AstFolder = undefined;                                       // The AstFolder relative to this service
    astFolderService: AstFolderService = new AstFolderService();            // The service relative to AstFolders
    private methodsArray: RowFileReport[] = [];                             // The array of methods reports
    template: HandlebarsTemplateDelegate;                                   // The HandleBar template used to generate the report


    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }

    /**
     * Returns the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(astFolder: AstFolder): RowFileReport[] {
        const report = this.getMethodsArray(astFolder);
        return this.sortByDecreasingCognitiveCpx(report);
    }


    /**
     * Recursion returning the array of methods reports of each subfolder
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArray(astFolder: AstFolder): RowFileReport[] {
        let report: RowFileReport[] = [];
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
        return methodsReport.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }


    /**
     * Returns the path to the report's page of a given AstFile
     * @param astFile
     */
    getFileLink(astFile: AstFile): string {
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
     * Generates the folder's report
     */
    generateReport(): void {
        this.methodsArray = this.getMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/folder-markdown-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    /**
     * Fills the HandleBar's template
     */
    private writeReport() {
        const template = this.template({
            rowFile: this.methodsArray,
        });

        if (this.astFolder.relativePath) {
            createRelativeDir(this.astFolder.relativePath);
        }

        const pathOutDir = constructLink(Options.pathOutDir);
        const relativePath = constructLink(this.astFolder.relativePath);
        const pathReport = `${deleteLastSlash(pathOutDir)}/${deleteLastSlash(
            relativePath
        )}/folder-report.md`;

        try {
            fs.writeFileSync(pathReport, template, { encoding: "utf-8" });
        } catch (err) {
            console.log(err);
        }
    }
}
