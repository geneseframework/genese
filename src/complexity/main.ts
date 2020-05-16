import * as ts from 'typescript';
import { TsFolder } from './models/ts-folder.model';
import { Options } from './models/options';
import { createOutDir } from './services/file.service';
import { TsFile } from './models/ts-file.model';
import { ReportsService } from './services/reports.service';
import { TsFolderService } from './services/ts-folder.service';
import { TsFileService } from './services/ts-file.service';


export class Main {

    private tsFolder?: TsFolder = new TsFolder();

    constructor() {
    }

    start(pathCommand: string, pathToAnalyze: string, pathGeneseNodeJs: string): void {
        console.log('START CALCULATION');
        console.log('args received', pathToAnalyze)
        Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        console.log('OPTIONS', Options)
        // this.getDebugReport(pathCommand);
        // this.setoptions(pathtoanalyse)
        this.createOutDir()
            .generateTree()
            .generateReports();
        console.log('COMPLEXITY REPORT GENERATED SUCCESSFULLY');
    }


    // setoptions(pathcommand: string, pathtoanalyse: string): main {
    //     options.setoptions(pathcommand, pathtoanalyse);
    //     return this;
// }

    createOutDir(): Main {
        createOutDir();
        return this;
    }

    getDebugReport(pathCommand: string) {
        const tsFile: TsFile = TsFileService.generateTree(`${pathCommand}/src/mocks/ast.mock.ts`);
        // for (const method of tsFile.tsmethods) {
        //     const tree = method.tstree;
        // tree.printallchildren();
        // }
    }


    generateTree(): Main {
        this.tsFolder = TsFolderService.generateTree(Options.pathFolderToAnalyze, 'ts');
        return this;
    }


    generateReports(): void {
        ReportsService.generateAllReports(this.tsFolder);
    }

}
