import * as fs from 'fs-extra';
import * as eol from 'eol';
import * as Handlebars from 'handlebars';
import { RowFileReport } from '../../models/report/row-file-report.model';
import { constructLink, createRelativeDir, deleteLastSlash } from '../../../core/services/file.service';
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
     * Generates the folder's report
     */
    generateReport(): void {
        this.methodsArrayReport = this.astFolderService.getMethodsArraySortedByDecreasingCognitiveCpx(this.astFolder);
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
