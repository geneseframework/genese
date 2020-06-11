import { ComplexityType } from '../enums/complexity-type.enum';
import { Complexity } from '../interfaces/complexity.interface';
import { ChartColor } from '../enums/chart-color.enum';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import * as fs from 'fs-extra';
import { getArrayOfPathsWithDotSlash } from '../services/file.service';


/**
 * The options used by genese-complexity
 * Some options can be override by command-line options or with geneseconfig.json
 */
export class Options {

    static cognitiveCpx: Complexity = {             // Options concerning the cognitive complexity
        errorThreshold: 10,                         // A complexity strictly greater than errorThreshold will be seen as error (can be overriden)
        type: ComplexityType.COGNITIVE,             // Sets the complexity type for this option (can't be overriden)
        warningThreshold: 5                         // A complexity strictly greater than warning threshold and lower or equal than errorThreshold will be seen as warning (can be overriden)
    };
    static colors: ChartColor[] = [                 // The colors of the charts
        ChartColor.CORRECT,
        ChartColor.WARNING,
        ChartColor.ERROR
    ];
    static cyclomaticCpx: Complexity = {            // Options concerning the cognitive complexity
        errorThreshold: 10,                         // A complexity strictly greater than errorThreshold will be seen as error (can be overriden)
        type: ComplexityType.CYCLOMATIC,            // Sets the complexity type for this option (can't be overriden)
        warningThreshold: 5                         // A complexity strictly greater than warning threshold and lower or equal than errorThreshold will be seen as warning (can be overriden)
    };
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
    static setOptionsFromCommandLine(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = pathToAnalyze;
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathOutDir = `${pathCommand}/genese/complexity/reports`;
    }


    /**
     * Sets the options of genese-complexity module with geneseconfig.json options (higher priority than geneseconfig.json options)
     * @param geneseConfigPath  // The path of the geneseconfig.json file
     */
    static setOptionsFromConfig(geneseConfigPath: string): void {
        const config = require(geneseConfigPath);
        Options.cognitiveCpx.errorThreshold = config.complexity?.cognitiveCpx?.errorThreshold ?? Options.cognitiveCpx.errorThreshold;
        Options.cognitiveCpx.warningThreshold = config.complexity?.cognitiveCpx?.warningThreshold ?? Options.cognitiveCpx.warningThreshold;
        Options.cyclomaticCpx.errorThreshold = config.complexity?.cyclomaticCpx?.errorThreshold ?? Options.cyclomaticCpx.errorThreshold;
        Options.cyclomaticCpx.warningThreshold = config.complexity?.cyclomaticCpx?.warningThreshold ?? Options.cyclomaticCpx.warningThreshold;
        Options.ignore = getArrayOfPathsWithDotSlash(config.complexity?.ignore) ?? Options.ignore;
        Options.pathFolderToAnalyze = config.complexity?.pathFolderToAnalyze ?? Options.pathFolderToAnalyze;
        Options.pathOutDir = config.complexity?.pathReports ?? Options.pathOutDir;
        Options.ignore.push(Options.pathOutDir);
    }


    /**
     * Gets the different thresholds defined in Options class
     */
    static getThresholds(): ComplexitiesByStatus {
        const cpxByStatus = new ComplexitiesByStatus();
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
    static isIgnored(path: string) : boolean {
        return  Options.ignore.includes(path);
    }
}
