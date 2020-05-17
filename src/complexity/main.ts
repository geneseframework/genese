import * as ts from 'typescript';
import { TsFolder } from './models/ts-folder.model';
import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/reports.service';
import { TsFolderService } from './services/ts-folder.service';
import { blueBright } from 'ansi-colors';


export class Main {

    constructor() {
    }

    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log('START CALCULATION');
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        createOutDir();
        const tsFolder = TsFolderService.generateTree(Options.pathFolderToAnalyze, 'ts');
        ReportsService.generateAllReports(tsFolder);
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }

}
