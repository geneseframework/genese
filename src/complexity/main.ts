import * as ts from 'typescript';
import { TsFolder } from './models/ts-folder.model';
import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { ReportsService } from './services/reports.service';
import { TsFolderService } from './services/ts-folder.service';
import { blueBright } from 'ansi-colors';


export class Main {

    private tsFolder?: TsFolder = new TsFolder();

    constructor() {
    }

    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log('START CALCULATION');
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        this.createOutDir()
            .generateTree()
            .generateReports();
        console.log(blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }


    createOutDir(): Main {
        createOutDir();
        return this;
    }


    generateTree(): Main {
        this.tsFolder = TsFolderService.generateTree(Options.pathFolderToAnalyze, 'ts');
        return this;
    }


    generateReports(): void {
        ReportsService.generateAllReports(this.tsFolder);
    }

}
