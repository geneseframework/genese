import * as fs from 'fs-extra';
import * as eol from "eol";
import * as Handlebars from "handlebars";
import { Options } from '../models/options';
import { getFilenameWithoutExtension, getRouteToRoot } from './file.service';
import { TreeFile } from '../models/tree-file.model';
import { MethodReport } from '../models/method-report.model';


export class TsFileReportService {

    private methods: MethodReport[] = [];
    private relativeRootReports = '';
    template: HandlebarsTemplateDelegate;
    tsFile: TreeFile = undefined;


    constructor(tsFile: TreeFile) {
        this.tsFile = tsFile;
    }


    getMethodsArray(): MethodReport[] {
        let report: MethodReport[] = [];
        for (const method of this.tsFile.treeMethods) {
            const methodReport: MethodReport = {
                code: method.getCode(),
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cognitiveValue: method.cognitiveValue,
                cyclomaticColor: method.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: method.cyclomaticValue,
                methodName: method.name,
            };
            report.push(methodReport);
        }
        return report;
    }


    generateReport(): void {
        this.methods = this.getMethodsArray();
        this.relativeRootReports = getRouteToRoot(this.tsFile.treeFolder?.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        const reportTemplate = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/file-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }


    private writeReport() {
        const template = this.template({
            colors: Options.colors,
            methods: this.methods,
            relativeRootReports: this.relativeRootReports,
            stats: this.tsFile.getStats(),
            thresholds: Options.getThresholds()
        });
        const filenameWithoutExtension = getFilenameWithoutExtension(this.tsFile.name);
        const pathReport = `${Options.pathOutDir}/${this.tsFile.treeFolder?.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, {encoding: 'utf-8'});
    }


    private registerPartial(partialName: string, filename: string): void {
        const partial = eol.auto(fs.readFileSync(`${Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
