import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { getFilenameWithoutExtension, getPathWithDotSlash, getRouteToRoot } from '../../../core/services/file.service';
import { MethodReport } from '../../models/report/method-report.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { Options } from '../../../core/models/options.model';

/**
 * Service generating files reports
 */
export class AstFileReportService {

    private methodReports: MethodReport[] = [];     // The array of method reports
    private relativeRootReports = '';               // The route between the position of the current TsFile and the root of the analysis
    template: HandlebarsTemplateDelegate;           // The HandleBar template used to generate the report
    astFile: AstFile = undefined;                   // The AstFile relative to this service


    constructor(astFile: AstFile) {
        this.astFile = astFile;
    }


    /**
     * Returns the array of methods with their analysis
     */
    getMethodsArray(): MethodReport[] {
        let report: MethodReport[] = [];
        for (const method of this.astFile.astMethods) {
            const methodReport: MethodReport = {
                code: method.displayedCode?.text,
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cpxIndex: method.cpxIndex,
                cyclomaticColor: method.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: method.cyclomaticCpx,
                methodName: method.name,
            };
            report.push(methodReport);
        }
        return report;
    }


    /**
     * Generates the file's report
     */
    generateReport(): void {
        this.methodReports = this.getMethodsArray();
        this.relativeRootReports = getRouteToRoot(this.astFile.astFolder?.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/file-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    /**
     * Creates the file of the report
     */
    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            methods: this.methodReports,
            relativeRootReports: getPathWithDotSlash(this.relativeRootReports),
            stats: this.astFile.stats,
            thresholds: Options.getThresholds()
        });
        const filenameWithoutExtension = getFilenameWithoutExtension(this.astFile.name);
        const pathReport = `${Options.pathOutDir}/${this.astFile.astFolder?.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
