"use strict";
exports.__esModule = true;
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var colors_enum_1 = require("../enums/colors.enum");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var fs = require("fs-extra");
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.setOptions = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        Options.setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        var geneseConfigPath = pathCommand + "/geneseconfig.json";
        if (fs.existsSync(geneseConfigPath)) {
            Options.setOptionsFromConfig(geneseConfigPath);
        }
    };
    Options.setOptionsFromCommandLine = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = pathToAnalyze;
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathReports = pathCommand + "/genese/complexity/reports";
    };
    Options.setOptionsFromConfig = function (geneseConfigPath) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var config = require(geneseConfigPath);
        Options.pathReports = (_b = (_a = config.complexity) === null || _a === void 0 ? void 0 : _a.pathReports) !== null && _b !== void 0 ? _b : Options.pathReports;
        Options.pathFolderToAnalyze = (_d = (_c = config.complexity) === null || _c === void 0 ? void 0 : _c.pathFolderToAnalyze) !== null && _d !== void 0 ? _d : Options.pathFolderToAnalyze;
        Options.cognitiveCpx.errorThreshold = (_g = (_f = (_e = config.complexity) === null || _e === void 0 ? void 0 : _e.cognitiveCpx) === null || _f === void 0 ? void 0 : _f.errorThreshold) !== null && _g !== void 0 ? _g : Options.cognitiveCpx.errorThreshold;
        Options.cognitiveCpx.warningThreshold = (_k = (_j = (_h = config.complexity) === null || _h === void 0 ? void 0 : _h.cognitiveCpx) === null || _j === void 0 ? void 0 : _j.warningThreshold) !== null && _k !== void 0 ? _k : Options.cognitiveCpx.warningThreshold;
        Options.cyclomaticCpx.errorThreshold = (_o = (_m = (_l = config.complexity) === null || _l === void 0 ? void 0 : _l.cyclomaticCpx) === null || _m === void 0 ? void 0 : _m.errorThreshold) !== null && _o !== void 0 ? _o : Options.cyclomaticCpx.errorThreshold;
        Options.cyclomaticCpx.warningThreshold = (_r = (_q = (_p = config.complexity) === null || _p === void 0 ? void 0 : _p.cyclomaticCpx) === null || _q === void 0 ? void 0 : _q.warningThreshold) !== null && _r !== void 0 ? _r : Options.cyclomaticCpx.warningThreshold;
    };
    Options.getThresholds = function () {
        var cpxByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpxByStatus.cognitive.warning = Options.cognitiveCpx.warningThreshold;
        cpxByStatus.cognitive.error = Options.cognitiveCpx.errorThreshold;
        cpxByStatus.cyclomatic.warning = Options.cyclomaticCpx.warningThreshold;
        cpxByStatus.cyclomatic.error = Options.cyclomaticCpx.errorThreshold;
        return cpxByStatus;
    };
    Options.cognitiveCpx = {
        errorThreshold: 10,
        type: complexity_type_enum_1.ComplexityType.COGNITIVE,
        warningThreshold: 5
    };
    Options.colors = [colors_enum_1.ChartColor.CORRECT, colors_enum_1.ChartColor.WARNING, colors_enum_1.ChartColor.ERROR];
    Options.cyclomaticCpx = {
        errorThreshold: 10,
        type: complexity_type_enum_1.ComplexityType.CYCLOMATIC,
        warningThreshold: 5
    };
    Options.pathCommand = '';
    Options.pathFolderToAnalyze = './';
    Options.pathGeneseNodeJs = '';
    Options.pathReports = '';
    return Options;
}());
exports.Options = Options;
