import * as fs from 'fs-extra';
import { TsFolder } from '../models/ts-folder.model';
import { getExtension, getRelativePath } from './file.service';
import { TsFileService } from './ts-file.service';
import { TsFile } from '../models/ts-file.model';
import { BarchartService } from './barchart.service';
import { ComplexityType } from '../enums/complexity-type.enum';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';
import { Options } from '../models/options';

export class TsFolderService extends StatsService {

    protected _stats: Stats = undefined;
    tsFolder: TsFolder = undefined;

    constructor(tsFolder: TsFolder) {
        super();
        this.tsFolder = tsFolder;
    }


    static generateTree(path: string, extension?: string, folder: TsFolder = new TsFolder()): TsFolder {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        const tsFolder: TsFolder = new TsFolder();
        tsFolder.path = path;
        // console.log('PATHHH', path);
        // console.log('PATHHH FOLDER TO ANALYSE Options.pathFolderToAnalyze', Options.pathFolderToAnalyze);
        tsFolder.relativePath = getRelativePath(Options.pathFolderToAnalyze, path);
        // console.log('PATHHH RELATIVE', tsFolder.relativePath);
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach(function(elementName) {
            const pathElement = path + elementName;
            if (fs.statSync(pathElement).isDirectory()) {
                let subFolder = new TsFolder();
                subFolder = TsFolderService.generateTree(`${pathElement}/`, extension, subFolder);
                subFolder.parent = folder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            } else {
                if (!extension || extension === getExtension(pathElement)) {
                    tsFolder.tsFiles.push(TsFileService.generateTree(pathElement, tsFolder));
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    }


    calculateStats(tsFolder: TsFolder): void {
        this._stats.numberOfFiles += tsFolder?.tsFiles?.length ?? 0;
        for (const file of tsFolder.tsFiles) {
            this.addFileStats(file);
        }
        for (const subFolder of tsFolder.subFolders) {
            this.calculateStats(subFolder);
        }
    }


     addFileStats(tsFile: TsFile): void {
        if (!tsFile) {
            return;
        }
        let tsFileStats = tsFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        this.addMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
        this.addMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
        this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    }


    addMethodsByStatus(type: ComplexityType, tsFileStats: Stats): void {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }


    getSubject(): void {
        this._stats.subject = getRelativePath(Options.pathCommand, this.tsFolder.path);
    }

}
