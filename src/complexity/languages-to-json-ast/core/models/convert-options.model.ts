import * as fs from 'fs-extra';
import { getArrayOfPathsWithDotSlash } from '../../../core/services/file.service';


/**
 * The options used by genese-complexity
 * Some options can be override by command-line options or with geneseconfig.json
 */
export class ConvertOptions {

    static ignore: string[] = [];                   // The paths of the files or folders to ignore
    static pathCommand = '';                        // The path of the folder where the command-line was entered (can't be overriden)
    static pathFolderToAnalyze = './';              // The path of the folder to analyse (can be overriden)
    static pathGeneseNodeJs = '';                   // The path of the node_module Genese in the nodejs user environment (can't be overriden)
    static pathOutDir = '';                         // The path where the reports are created (can be overriden)


    /**
     * Sets the options of genese-complexity module
     * @param pathCommand       // The path of the folder where the command-line was entered (can't be overriden)
     * @param pathToAnalyze     // The path of the folder to analyse (can be overriden)
     * @param pathGeneseNodeJs  // The path of the node_module Genese in the nodejs user environment (can't be overriden)
     */
    static setOptions(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
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
    static setOptionsFromCommandLine(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        ConvertOptions.pathCommand = pathCommand;
        ConvertOptions.pathFolderToAnalyze = pathToAnalyze;
        ConvertOptions.pathGeneseNodeJs = pathGeneseNodeJs;
        ConvertOptions.pathOutDir = `${pathCommand}/genese/complexity/reports`;
    }


    /**
     * Sets the options of genese-complexity module with geneseconfig.json options (higher priority than geneseconfig.json options)
     * @param geneseConfigPath  // The path of the geneseconfig.json file
     */
    static setOptionsFromConfig(geneseConfigPath: string): void {
        const config = require(geneseConfigPath);
        ConvertOptions.ignore = getArrayOfPathsWithDotSlash(config.complexity?.ignore) ?? ConvertOptions.ignore;
        ConvertOptions.pathFolderToAnalyze = config.complexity?.pathFolderToAnalyze ?? ConvertOptions.pathFolderToAnalyze;
        ConvertOptions.pathOutDir = config.complexity?.pathReports ?? ConvertOptions.pathOutDir;
        ConvertOptions.ignore.push(ConvertOptions.pathOutDir);
    }


    /**
     * Checks if a file or a folder is ignored in geneseconfig.json
     * @param path
     */
    static isIgnored(path: string) : boolean {
        return  ConvertOptions.ignore.includes(path);
    }
}
