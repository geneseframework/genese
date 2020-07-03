"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFileReportService = void 0;
const fs = require("fs-extra");
const eol = require("eol");
const Handlebars = require("handlebars");
const file_service_1 = require("../../../core/services/file.service");
const options_model_1 = require("../../../core/models/options.model");
/**
 * Service generating files reports
 */
class AstFileReportService {
    constructor(astFile) {
        this.methodReports = []; // The array of method reports
        this.relativeRootReports = ''; // The route between the pos of the current TsFile and the root of the analysis
        this.astFile = undefined; // The AstFile relative to this service
        this.astFile = astFile;
    }
    /**
     * Returns the array of methods with their analysis
     */
    getMethodsArray() {
        var _a;
        let report = [];
        for (const method of this.astFile.astMethods) {
            const methodReport = {
                code: (_a = method.displayedCode) === null || _a === void 0 ? void 0 : _a.text,
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
    generateReport() {
        var _a;
        this.methodReports = this.getMethodsArray();
        this.relativeRootReports = file_service_1.getRouteToRoot((_a = this.astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        const reportTemplate = eol.auto(fs.readFileSync(`${options_model_1.Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/file-report.handlebars`, 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    }
    /**
     * Creates the file of the report
     */
    writeReport() {
        var _a;
        const template = this.template({
            colors: options_model_1.Options.colors,
            methods: this.methodReports,
            relativeRootReports: file_service_1.getPathWithDotSlash(this.relativeRootReports),
            stats: this.astFile.stats,
            thresholds: options_model_1.Options.getThresholds()
        });
        const filenameWithoutExtension = file_service_1.getFilenameWithoutExtension(this.astFile.name);
        const pathReport = `${options_model_1.Options.pathOutDir}/${(_a = this.astFile.astFolder) === null || _a === void 0 ? void 0 : _a.relativePath}/${filenameWithoutExtension}.html`;
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    }
    /**
     * Registers a HandleBar's partial for a given partial's name and a given filename
     * @param partialName   // The name of the partial
     * @param filename      // The name of the file
     */
    registerPartial(partialName, filename) {
        const partial = eol.auto(fs.readFileSync(`${options_model_1.Options.pathGeneseNodeJs}/src/complexity/json-ast-to-reports/templates/handlebars/${filename}.handlebars`, 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    }
}
exports.AstFileReportService = AstFileReportService;
