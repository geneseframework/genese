import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import { RowFileReport } from '../../models/report/row-file-report.model';
import {
    constructLink,
    createRelativeDir,
    deleteLastSlash
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
    private methodsArrayReport: RowFileReport[] = [];                       // The array of methods reports
    template: HandlebarsTemplateDelegate = undefined;                       // The HandleBar template used to generate the report


    constructor(astFolder: AstFolder) {
        this.astFolder = astFolder;
        this.astFolderService.astFolder = this.astFolder;
    }

    /**
     * Set the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    setMethodsArraySortedByDecreasingCognitiveCpx(astFolder: AstFolder): void {
        this.setMethodsArrayReport(astFolder);
        this.methodsArrayReport = this.sortByDecreasingCognitiveCpx(this.methodsArrayReport); 
    }

    /**
     * Recursion setting the array of methods reports of each subfolder
     * @param astFolder    // The AstFolder to analyse
     */
    setMethodsArrayReport(astFolder: AstFolder): void {
        for (const subfolder of astFolder.children) {
            this.setTsFileReport(subfolder);
            this.setMethodsArrayReport(subfolder);
        }
    }

    /**
     * Recursion setting the array of methods reports of each subfolder's files
     * @param astFolder    // The AstFolder to analyse
     */
    setTsFileReport(folder: AstFolder): void{
        for (const tsFile of folder.astFiles){
            this.setAstMethodReport(tsFile)
        }
    }

    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFolder    // The AstFolder to analyse
     */
    setAstMethodReport(tsFile: AstFile): void{
        for (const astMethod of tsFile.astMethods) {
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: tsFile.name,
                linkFile: undefined,
                methodName: astMethod.name
            })
        }
    }

    /**
     * The method sorting the rows of the methods report by decreasing cognitive complexity
     * @param methodsReport     // The array to sort
     */
    sortByDecreasingCognitiveCpx(methodsReport: MethodReport[]): MethodReport[] {
        return methodsReport.sort((a, b) => b.cpxIndex - a.cpxIndex);
    }


    /**
     * Generates the folder's report
     */
    generateReport(): void {
        this.setMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/folder-markdown-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    /**
     * Fills the HandleBar's template
     */
    private writeReport() {
        const template = this.template({
            rowFile: this.methodsArrayReport,
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
