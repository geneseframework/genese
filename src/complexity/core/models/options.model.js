"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.WINDOWS = void 0;
const fs = require("fs-extra");
const file_service_1 = require("../services/file.service");
const complexity_type_enum_1 = require("../../json-ast-to-reports/enums/complexity-type.enum");
const chart_color_enum_1 = require("../../json-ast-to-reports/enums/chart-color.enum");
const complexities_by_status_interface_1 = require("../../json-ast-to-reports/interfaces/complexities-by-status.interface");
exports.WINDOWS = false;
/**
 * The options used by genese-complexity
 * Some options can be override by command-line options or with geneseconfig.json
 */
class Options {
    /**
     * Sets the options of genese-complexity module
     * @param pathCommand               // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathFolderToAnalyze       // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs          // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptions(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs) {
        exports.WINDOWS = process.platform === 'win32';
        const geneseConfigPath = `${pathCommand}/geneseconfig.json`;
        if (fs.existsSync(geneseConfigPath)) {
            Options.setOptionsFromConfig(geneseConfigPath);
        }
        Options.setOptionsFromCommandLine(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs);
    }
    /**
     * Sets the options of genese-complexity module with command-line options (lower priority than geneseconfig.json options)
     * @param pathCommand               // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathFolderToAnalyze       // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs          // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptionsFromCommandLine(pathCommand, pathFolderToAnalyze, pathGeneseNodeJs) {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = file_service_1.getPathWithSlash(pathFolderToAnalyze);
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathOutDir = `${pathCommand}/genese/complexity/reports`;
    }
    /**
     * Sets the options of genese-complexity module with geneseconfig.json options (higher priority than geneseconfig.json options)
     * @param geneseConfigPath  // The path of the geneseconfig.json file
     */
    static setOptionsFromConfig(geneseConfigPath) {
        var _a, _b, _c, _d, _e;
        const config = require(geneseConfigPath);
        Options.ignore = (_a = this.filterIgnorePathsForDotSlash(config.complexity.ignore)) !== null && _a !== void 0 ? _a : Options.ignore;
        Options.ignore.forEach((path, i) => {
            Options.ignoreRegex += i !== Options.ignore.length - 1 ? `${this.pathTransformator(path)}|` : `${this.pathTransformator(path)}`;
        });
        Options.pathFolderToAnalyze = (_c = (_b = config.complexity) === null || _b === void 0 ? void 0 : _b.pathFolderToAnalyze) !== null && _c !== void 0 ? _c : Options.pathFolderToAnalyze;
        Options.pathOutDir = (_e = (_d = config.complexity) === null || _d === void 0 ? void 0 : _d.pathReports) !== null && _e !== void 0 ? _e : Options.pathOutDir;
        Options.ignore.push(Options.pathOutDir);
    }
    /**
     * Separate paths which needs to start by "./" and others
     * @param ignorePaths
     * @returns {String[]}
     */
    static filterIgnorePathsForDotSlash(ignorePaths) {
        const ignorePathsToFormat = ignorePaths.filter((x) => !x.startsWith('*.'));
        const ignorePathsToKeep = ignorePaths.filter((x) => x.startsWith('*.'));
        return file_service_1.getArrayOfPathsWithDotSlash(ignorePathsToFormat).concat(ignorePathsToKeep);
    }
    /**
     * Checks if a file or a folder is ignored in geneseconfig.json
     * @param path
     */
    static isIgnored(path) {
        var _a;
        return ((_a = path.match(Options.ignoreRegex)) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    static pathTransformator(path) {
        const SEPARATED_PATH = path.split('/');
        let pathTester = '';
        SEPARATED_PATH.forEach((subPath, i) => {
            if (subPath.startsWith('*.')) {
                subPath = subPath.split('.').join('\\.');
                pathTester = subPath.replace('*\\.', '[a-z]*\\.');
            }
            else {
                if (subPath.match('([a-z].*)')) {
                    i !== SEPARATED_PATH.length - 1
                        ? (pathTester += `${subPath}\\/`)
                        : (pathTester += `${subPath}`);
                }
                if (subPath.match('(\\*\\*)') || subPath.match('(\\*)')) {
                    i !== SEPARATED_PATH.length - 1
                        ? (pathTester += '([a-z].*)\\/')
                        : (pathTester += '([a-z].*)');
                }
                if (subPath.match('(\\.$)')) {
                    i !== SEPARATED_PATH.length - 1
                        ? (pathTester += `${subPath}\\/`)
                        : (pathTester += subPath);
                }
            }
        });
        return pathTester;
    }
    static handleStarPath(ignorePath, path) {
        if (ignorePath.startsWith('*.')) {
            return path.includes(ignorePath.slice(1));
        }
        return false;
    }
    /**
     * Gets the different thresholds defined in Options class
     * @returns {ComplexitiesByStatus}
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
    errorThreshold: 20,
    type: complexity_type_enum_1.ComplexityType.COGNITIVE,
    warningThreshold: 10,
};
Options.colors = [
    chart_color_enum_1.ChartColor.CORRECT,
    chart_color_enum_1.ChartColor.WARNING,
    chart_color_enum_1.ChartColor.ERROR,
];
Options.cyclomaticCpx = {
    errorThreshold: 10,
    type: complexity_type_enum_1.ComplexityType.CYCLOMATIC,
    warningThreshold: 5,
};
Options.ignore = []; // The paths of the files or folders to ignore
Options.ignoreRegex = '';
Options.pathCommand = ''; // The path of the folder where the command-line was entered (can't be overriden)
Options.pathFolderToAnalyze = './'; // The path of the folder to analyse (can be overriden)
Options.pathGeneseNodeJs = ''; // The path of the node_module Genese in the nodejs user environment (can't be overriden)
Options.pathOutDir = ''; // The path where the reports are created (can be overriden)
