"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const eol = require("eol");
const Handlebars = require("handlebars");
const options_1 = require("../models/options");
const file_service_1 = require("./file.service");
class TsFileReportService {
    constructor(tsFile) {
        this.methods = [];
        this.relativeRootReports = '';
        this.tsFile = undefined;
        this.tsFile = tsFile;
    }
    getMethodsArray() {
        let report = [];
        for (const method of this.tsFile.treeMethods) {
            const methodReport = {
                code: method.text,
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
    generateReport() {
        var _a;
        this.methods = this.getMethodsArray();
        this.relativeRootReports = file_service_1.getRouteToRoot((_a = this.tsFile.treeFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        const reportTemplate = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/file-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }
    writeReport() {
        var _a;
        const template = this.template({
            colors: options_1.Options.colors,
            methods: this.methods,
            relativeRootReports: file_service_1.getPathWithDotSlash(this.relativeRootReports),
            stats: this.tsFile.getStats(),
            thresholds: options_1.Options.getThresholds()
        });
        const filenameWithoutExtension = file_service_1.getFilenameWithoutExtension(this.tsFile.name);
        const pathReport = `${options_1.Options.pathOutDir}/${(_a = this.tsFile.treeFolder) === null || _a === void 0 ? void 0 : _a.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }
    registerPartial(partialName, filename) {
        const partial = eol.auto(fs.readFileSync(`${options_1.Options.pathGeneseNodeJs}/src/complexity/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
exports.TsFileReportService = TsFileReportService;
