"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var eol = require("eol");
var Handlebars = require("handlebars");
var options_1 = require("../models/options");
var file_service_1 = require("./file.service");
var TsFileReportService = /** @class */ (function () {
    function TsFileReportService(tsFile) {
        this.methods = [];
        this.relativeRootReports = '';
        this.tsFile = undefined;
        this.tsFile = tsFile;
    }
    TsFileReportService.prototype.getMethodsArray = function () {
        var report = [];
        for (var _i = 0, _a = this.tsFile.tsMethods; _i < _a.length; _i++) {
            var method = _a[_i];
            var methodReport = {
                code: method.getCode(),
                cognitiveColor: method.cognitiveStatus.toLowerCase(),
                cognitiveValue: method.cognitiveValue,
                cyclomaticColor: method.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: method.cyclomaticValue,
                methodName: method.name
            };
            report.push(methodReport);
        }
        return report;
    };
    TsFileReportService.prototype.generateReport = function () {
        var _a;
        this.methods = this.getMethodsArray();
        this.relativeRootReports = file_service_1.getRouteToRoot((_a = this.tsFile.tsFolder) === null || _a === void 0 ? void 0 : _a.relativePath);
        this.registerPartial("cognitiveBarchartScript", 'cognitive-barchart');
        this.registerPartial("cyclomaticBarchartScript", 'cyclomatic-barchart');
        this.registerPartial("cognitiveDoughnutScript", 'cognitive-doughnut');
        this.registerPartial("cyclomaticDoughnutScript", 'cyclomatic-doughnut');
        this.registerPartial("method", 'methods');
        var reportTemplate = eol.auto(fs.readFileSync(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/handlebars/file-report.handlebars", 'utf-8'));
        this.template = Handlebars.compile(reportTemplate);
        this.writeReport();
    };
    TsFileReportService.prototype.writeReport = function () {
        var _a;
        var template = this.template({
            colors: options_1.Options.colors,
            methods: this.methods,
            relativeRootReports: this.relativeRootReports,
            stats: this.tsFile.getStats(),
            thresholds: options_1.Options.getThresholds()
        });
        var filenameWithoutExtension = file_service_1.getFilenameWithoutExtension(this.tsFile.name);
        var pathReport = options_1.Options.pathOutDir + "/" + ((_a = this.tsFile.tsFolder) === null || _a === void 0 ? void 0 : _a.relativePath) + "/" + filenameWithoutExtension + ".html";
        fs.writeFileSync(pathReport, template, { encoding: 'utf-8' });
    };
    TsFileReportService.prototype.registerPartial = function (partialName, filename) {
        var partial = eol.auto(fs.readFileSync(options_1.Options.pathGeneseNodeJs + "/src/complexity/templates/handlebars/" + filename + ".handlebars", 'utf-8'));
        Handlebars.registerPartial(partialName, partial);
    };
    return TsFileReportService;
}());
exports.TsFileReportService = TsFileReportService;
