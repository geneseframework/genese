"use strict";
exports.__esModule = true;
var complexity_type_enum_1 = require("../enums/complexity-type.enum");
var colors_enum_1 = require("../enums/colors.enum");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var Options = /** @class */ (function () {
    function Options() {
    }
    Options.setOptions = function (pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = pathToAnalyze;
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathReports = pathCommand + "/genese/complexity/reports";
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
    Options.pathFolderToAnalyze = '';
    Options.pathGeneseNodeJs = '';
    Options.pathReports = '';
    return Options;
}());
exports.Options = Options;
