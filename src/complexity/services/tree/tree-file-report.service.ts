import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Options } from '../../models/options';
import { getFilenameWithoutExtension, getPathWithDotSlash, getRouteToRoot } from '../file.service';
import { TreeFile } from '../../models/tree/tree-file.model';
import { MethodReport } from '../../models/report/method-report.model';

/**
 * Service generating files reports
 */
export class TreeFileReportService {

    private methodReports: MethodReport[] = [];     // The array of method reports
    private relativeRootReports = '';               // The route between the position of the current TsFile and the root of the analysis
    template: HandlebarsTemplateDelegate;           // The HandleBar template used to generate the report
    treeFile: TreeFile = undefined;                 // The TreeFile relative to this service


    constructor(treeFile: TreeFile) {
        this.treeFile = treeFile;
    }


    /**
     * Returns the array of methods with their analysis
     */
    getMethodsArray(): MethodReport[] {
        let report: MethodReport[] = [];
        for (const method of this.treeFile.treeMethods) {
            const methodReport: MethodReport = {
                code: method.displayedCode?.text,
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cognitiveValue: method.cpxIndex,
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
        this.relativeRootReports = getRouteToRoot(this.treeFile.treeFolder?.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/file-report.handlebars`, 'utf-8'));
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
            stats: this.treeFile.getStats(),
            thresholds: Options.getThresholds()
        });
        const filenameWithoutExtension = getFilenameWithoutExtension(this.treeFile.name);
        const pathReport = `${Options.pathOutDir}/${this.treeFile.treeFolder?.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
