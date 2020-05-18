import * as fs from 'fs-extra';
import { TreeFolder } from '../models/tree-folder.model';
import { getExtension, getRelativePath } from './file.service';
import { TreeFileService } from './tree-file.service';
import { TreeFile } from '../models/tree-file.model';
import { BarchartService } from './barchart.service';
import { ComplexityType } from '../enums/complexity-type.enum';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';
import { Options } from '../models/options';

export class TreeFolderService extends StatsService {

    protected _stats: Stats = undefined;
    tsFolder: TreeFolder = undefined;

    constructor(tsFolder: TreeFolder) {
        super();
        this.tsFolder = tsFolder;
    }


    static generateTree(path: string, extension?: string, folder: TreeFolder = new TreeFolder()): TreeFolder {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        const tsFolder: TreeFolder = new TreeFolder();
        tsFolder.path = path;
        tsFolder.relativePath = getRelativePath(Options.pathFolderToAnalyze, path);
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach(function(elementName) {
            const pathElement = path + elementName;
            if (fs.statSync(pathElement).isDirectory()) {
                let subFolder = new TreeFolder();
                subFolder = TreeFolderService.generateTree(`${pathElement}/`, extension, subFolder);
                subFolder.parent = folder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            } else {
                if (!extension || extension === getExtension(pathElement)) {
                    tsFolder.tsFiles.push(TreeFileService.generateTree(pathElement, tsFolder));
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    }


    calculateStats(tsFolder: TreeFolder): void {
        this._stats.numberOfFiles += tsFolder?.tsFiles?.length ?? 0;
        for (const file of tsFolder.tsFiles) {
            this.addFileStats(file);
        }
        for (const subFolder of tsFolder.subFolders) {
            this.calculateStats(subFolder);
        }
    }


     addFileStats(tsFile: TreeFile): void {
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
