"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
const fs = require("fs-extra");
const file_service_1 = require("../services/file.service");
const complexity_type_enum_1 = require("../../json-ast-to-reports/enums/complexity-type.enum");
const chart_color_enum_1 = require("../../json-ast-to-reports/enums/chart-color.enum");
const complexities_by_status_interface_1 = require("../../json-ast-to-reports/interfaces/complexities-by-status.interface");
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
        var _a, _b, _c, _d, _e, _f;
        const config = require(geneseConfigPath);
        Options.ignore = (_b = file_service_1.getArrayOfPathsWithDotSlash((_a = config.complexity) === null || _a === void 0 ? void 0 : _a.ignore)) !== null && _b !== void 0 ? _b : Options.ignore;
        Options.pathFolderToAnalyze = (_d = (_c = config.complexity) === null || _c === void 0 ? void 0 : _c.pathFolderToAnalyze) !== null && _d !== void 0 ? _d : Options.pathFolderToAnalyze;
        Options.pathOutDir = (_f = (_e = config.complexity) === null || _e === void 0 ? void 0 : _e.pathReports) !== null && _f !== void 0 ? _f : Options.pathOutDir;
        Options.ignore.push(Options.pathOutDir);
    }
    /**
     * Checks if a file or a folder is ignored in geneseconfig.json
     * @param path
     */
    static isIgnored(path) {
        return Options.ignore.includes(path);
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
