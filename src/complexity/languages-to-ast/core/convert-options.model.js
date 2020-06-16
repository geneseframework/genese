"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertOptions = void 0;
const fs = require("fs-extra");
const file_service_1 = require("../../core/services/file.service");
/**
 * The options used by genese-complexity
 * Some options can be override by command-line options or with geneseconfig.json
 */
class ConvertOptions {
    /**
     * Sets the options of genese-complexity module
     * @param pathCommand       // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathToAnalyze     // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs  // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        ConvertOptions.setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        const geneseConfigPath = `${pathCommand}/geneseconfig.json`;
        if (fs.existsSync(geneseConfigPath)) {
            ConvertOptions.setOptionsFromConfig(geneseConfigPath);
        }
    }
    /**
     * Sets the options of genese-complexity module with command-line options (lower priority than geneseconfig.json options)
     * @param pathCommand       // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathToAnalyze     // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs  // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        ConvertOptions.pathCommand = pathCommand;
        ConvertOptions.pathFolderToAnalyze = pathToAnalyze;
        ConvertOptions.pathGeneseNodeJs = pathGeneseNodeJs;
        ConvertOptions.pathOutDir = `${pathCommand}/genese/complexity/reports`;
    }
    /**
     * Sets the options of genese-complexity module with geneseconfig.json options (higher priority than geneseconfig.json options)
     * @param geneseConfigPath  // The path of the geneseconfig.json file
     */
    static setOptionsFromConfig(geneseConfigPath) {
        var _a, _b, _c, _d, _e, _f;
        const config = require(geneseConfigPath);
        ConvertOptions.ignore = (_b = file_service_1.getArrayOfPathsWithDotSlash((_a = config.complexity) === null || _a === void 0 ? void 0 : _a.ignore)) !== null && _b !== void 0 ? _b : ConvertOptions.ignore;
        ConvertOptions.pathFolderToAnalyze = (_d = (_c = config.complexity) === null || _c === void 0 ? void 0 : _c.pathFolderToAnalyze) !== null && _d !== void 0 ? _d : ConvertOptions.pathFolderToAnalyze;
        ConvertOptions.pathOutDir = (_f = (_e = config.complexity) === null || _e === void 0 ? void 0 : _e.pathReports) !== null && _f !== void 0 ? _f : ConvertOptions.pathOutDir;
        ConvertOptions.ignore.push(ConvertOptions.pathOutDir);
    }
    /**
     * Checks if a file or a folder is ignored in geneseconfig.json
     * @param path
     */
    static isIgnored(path) {
        return ConvertOptions.ignore.includes(path);
    }
}
exports.ConvertOptions = ConvertOptions;
ConvertOptions.ignore = []; // The paths of the files or folders to ignore
ConvertOptions.pathCommand = ''; // The path of the folder where the command-line was entered (can't be overriden)
ConvertOptions.pathFolderToAnalyze = './'; // The path of the folder to analyse (can be overriden)
ConvertOptions.pathGeneseNodeJs = ''; // The path of the node_module Genese in the nodejs user environment (can't be overriden)
ConvertOptions.pathOutDir = ''; // The path where the reports are created (can be overriden)
