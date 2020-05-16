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
    static pathFolderToAnalyze = '';
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
        console.log('CONIG JSON CPX', config.complexity);
        Options.pathReports = config.complexity?.pathReports ?? Options.pathReports;
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
