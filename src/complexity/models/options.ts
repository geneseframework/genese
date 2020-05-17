import { ComplexityType } from '../enums/complexity-type.enum';
import { Complexity } from '../interfaces/complexity.interface';
import { ChartColor } from '../enums/colors.enum';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import * as fs from 'fs-extra';


export class Options {

    static cognitiveCpx: Complexity = {
        errorThreshold: 10,
        type: ComplexityType.COGNITIVE,
        warningThreshold: 5
    };
    static colors: ChartColor[] = [ChartColor.CORRECT, ChartColor.WARNING, ChartColor.ERROR];
    static cyclomaticCpx: Complexity = {
        errorThreshold: 10,
        type: ComplexityType.CYCLOMATIC,
        warningThreshold: 5
    };
    static pathCommand = '';
    static pathFolderToAnalyze = './';
    static pathGeneseNodeJs = '';
    static pathReports = '';


    static setOptions(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        Options.setOptionsFromCommandLine(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        const geneseConfigPath = `${pathCommand}/geneseconfig.json`;
        if (fs.existsSync(geneseConfigPath)) {
            Options.setOptionsFromConfig(geneseConfigPath);
        }
    }


    static setOptionsFromCommandLine(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        Options.pathCommand = pathCommand;
        Options.pathFolderToAnalyze = pathToAnalyze;
        Options.pathGeneseNodeJs = pathGeneseNodeJs;
        Options.pathReports = `${pathCommand}/genese/complexity/reports`;
    }


    static setOptionsFromConfig(geneseConfigPath: string): void {
        const config = require(geneseConfigPath);
        Options.pathReports = config.complexity?.pathReports ?? Options.pathReports;
        Options.pathFolderToAnalyze = config.complexity?.pathFolderToAnalyze ?? Options.pathFolderToAnalyze;
        Options.cognitiveCpx.errorThreshold = config.complexity?.cognitiveCpx?.errorThreshold ?? Options.cognitiveCpx.errorThreshold;
        Options.cognitiveCpx.warningThreshold = config.complexity?.cognitiveCpx?.warningThreshold ?? Options.cognitiveCpx.warningThreshold;
        Options.cyclomaticCpx.errorThreshold = config.complexity?.cyclomaticCpx?.errorThreshold ?? Options.cyclomaticCpx.errorThreshold;
        Options.cyclomaticCpx.warningThreshold = config.complexity?.cyclomaticCpx?.warningThreshold ?? Options.cyclomaticCpx.warningThreshold;
    }


    static getThresholds(): ComplexitiesByStatus {
        const cpxByStatus = new ComplexitiesByStatus();
        cpxByStatus.cognitive.warning = Options.cognitiveCpx.warningThreshold;
        cpxByStatus.cognitive.error = Options.cognitiveCpx.errorThreshold;
        cpxByStatus.cyclomatic.warning = Options.cyclomaticCpx.warningThreshold;
        cpxByStatus.cyclomatic.error = Options.cyclomaticCpx.errorThreshold;
        return cpxByStatus;
    }
}
