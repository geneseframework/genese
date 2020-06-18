"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const complexity_type_enum_1 = require("../enums/complexity-type.enum");
const chart_color_enum_1 = require("../enums/chart-color.enum");
const complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
const fs = require("fs-extra");
const file_service_1 = require("../../core/services/file.service");
/**
 * The options used by genese-complexity
 * Some options can be override by command-line options or with geneseconfig.json
 */
class Options {
    /**
     * Sets the options of genese-complexity module
     * @param pathCommand       // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathToAnalyze     // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs  // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        Options.setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        const geneseConfigPath = `${pathCommand}/geneseconfig.json`;
        if (fs.existsSync(geneseConfigPath)) {
            Options.setOptionsFromConfig(geneseConfigPath);
        }
    }
    /**
     * Sets the options of genese-complexity module with command-line options (lower priority than geneseconfig.json options)
     * @param pathCommand       // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathToAnalyze     // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs  // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = pathToAnalyze;
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathOutDir = `${pathCommand}/genese/complexity/reports`;
    }
    /**
     * Sets the options of genese-complexity module with geneseconfig.json options (higher priority than geneseconfig.json options)
     * @param geneseConfigPath  // The path of the geneseconfig.json file
     */
    static setOptionsFromConfig(geneseConfigPath) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        const config = require(geneseConfigPath);
        Options.cognitiveCpx.errorThreshold = (_c = (_b = (_a = config.complexity) === null || _a === void 0 ? void 0 : _a.cognitiveCpx) === null || _b === void 0 ? void 0 : _b.errorThreshold) !== null && _c !== void 0 ? _c : Options.cognitiveCpx.errorThreshold;
        Options.cognitiveCpx.warningThreshold = (_f = (_e = (_d = config.complexity) === null || _d === void 0 ? void 0 : _d.cognitiveCpx) === null || _e === void 0 ? void 0 : _e.warningThreshold) !== null && _f !== void 0 ? _f : Options.cognitiveCpx.warningThreshold;
        Options.cyclomaticCpx.errorThreshold = (_j = (_h = (_g = config.complexity) === null || _g === void 0 ? void 0 : _g.cyclomaticCpx) === null || _h === void 0 ? void 0 : _h.errorThreshold) !== null && _j !== void 0 ? _j : Options.cyclomaticCpx.errorThreshold;
        Options.cyclomaticCpx.warningThreshold = (_m = (_l = (_k = config.complexity) === null || _k === void 0 ? void 0 : _k.cyclomaticCpx) === null || _l === void 0 ? void 0 : _l.warningThreshold) !== null && _m !== void 0 ? _m : Options.cyclomaticCpx.warningThreshold;
        Options.ignore = (_p = file_service_1.getArrayOfPathsWithDotSlash((_o = config.complexity) === null || _o === void 0 ? void 0 : _o.ignore)) !== null && _p !== void 0 ? _p : Options.ignore;
        Options.pathFolderToAnalyze = (_r = (_q = config.complexity) === null || _q === void 0 ? void 0 : _q.pathFolderToAnalyze) !== null && _r !== void 0 ? _r : Options.pathFolderToAnalyze;
        Options.pathOutDir = (_t = (_s = config.complexity) === null || _s === void 0 ? void 0 : _s.pathReports) !== null && _t !== void 0 ? _t : Options.pathOutDir;
        Options.ignore.push(Options.pathOutDir);
    }
    /**
     * Gets the different thresholds defined in Options class
     */
    static getThresholds() {
        const cpxByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        cpxByStatus.cognitive.warning = Options.cognitiveCpx.warningThreshold;
        cpxByStatus.cognitive.error = Options.cognitiveCpx.errorThreshold;
        cpxByStatus.cyclomatic.warning = Options.cyclomaticCpx.warningThreshold;
        cpxByStatus.cyclomatic.error = Options.cyclomaticCpx.errorThreshold;
        return cpxByStatus;
    }
    /**
     * Checks if a file or a folder is ignored in geneseconfig.json
     * @param path
     */
    static isIgnored(path) {
        return Options.ignore.includes(path);
    }
}
exports.Options = Options;
Options.cognitiveCpx = {
    errorThreshold: 10,
    type: complexity_type_enum_1.ComplexityType.COGNITIVE,
    warningThreshold: 5 // A complexity strictly greater than warning threshold and lower or equal than errorThreshold will be seen as warning (can be overriden)
};
Options.colors = [
    chart_color_enum_1.ChartColor.CORRECT,
    chart_color_enum_1.ChartColor.WARNING,
    chart_color_enum_1.ChartColor.ERROR
];
Options.cyclomaticCpx = {
    errorThreshold: 10,
    type: complexity_type_enum_1.ComplexityType.CYCLOMATIC,
    warningThreshold: 5 // A complexity strictly greater than warning threshold and lower or equal than errorThreshold will be seen as warning (can be overriden)
};
Options.ignore = []; // The paths of the files or folders to ignore
Options.pathCommand = ''; // The path of the folder where the command-line was entered (can't be overriden)
Options.pathFolderToAnalyze = './'; // The path of the folder to analyse (can be overriden)
Options.pathGeneseNodeJs = ''; // The path of the node_module Genese in the nodejs user environment (can't be overriden)
Options.pathOutDir = ''; // The path where the reports are created (can be overriden)
