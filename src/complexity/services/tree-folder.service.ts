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

/**
 * - TreeFolders generation from Abstract Syntax Tree of a folder
 * - Other services for TreeFolders
 */
export class TreeFolderService extends StatsService {

    protected _stats: Stats = undefined;            // The statistics of the TreeFolder
    treeFolder: TreeFolder = undefined;             // The TreeFolder corresponding to this service

    constructor(treeFolder: TreeFolder) {
        super();
        this.treeFolder = treeFolder;
    }


    /**
     * Generates the TreeFolder for a given folder
     * The tree is generated according to the Abstract Syntax Tree (AST) of the folder
     * @param path              // The path of the folder
     * @param extension         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The TreeFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    static generateTree(path: string, extension?: string, treeSubFolder?: TreeFolder): TreeFolder {
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
                subFolder.parent = treeSubFolder;
                subFolder.path = pathElement;
                tsFolder.subFolders.push(subFolder);
            } else {
                if (!extension || extension === getExtension(pathElement)) {
                    tsFolder.treeFiles.push(TreeFileService.generateTree(pathElement, tsFolder));
                }
            }
        });
        tsFolder.evaluate();
        return tsFolder;
    }


    /**
     * Calculates the statistics of the TreeFolder
     * @param treeFolder        // The TreeFolder to analyse
     */
    calculateStats(treeFolder: TreeFolder): void {
        this._stats.numberOfFiles += treeFolder?.treeFiles?.length ?? 0;
        for (const file of treeFolder.treeFiles) {
            this.incrementFileStats(file);
        }
        for (const subFolder of treeFolder.subFolders) {
            this.calculateStats(subFolder);
        }
    }


    /**
     * Increments TreeFolder statistics for a given treeFile
     * @param treeFile       // The TreeFile to analyse
     */
    incrementFileStats(treeFile: TreeFile): void {
        if (!treeFile) {
            return;
        }
        let tsFileStats = treeFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        this.incrementMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
        this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
        this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    incrementMethodsByStatus(type: ComplexityType, tsFileStats: Stats): void {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }


    /**
     * Returns the path of the TreeFolder linked to this service
     */
    getNameOrPath(): void {
        this._stats.subject = getRelativePath(Options.pathCommand, this.treeFolder.path);
    }


    /**
     * Returns the path between a TreeFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the TreeFolder
     * @param treeFile        // The path of the TreeFile
     */
    getRouteFromFolderToFile(treeFolder: TreeFolder, treeFile: TreeFile): string {
        if (!treeFile || !treeFolder) {
            return undefined;
        }
        if (treeFile.treeFolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log(`The file ${treeFile.name} is not inside the folder ${treeFolder.path}`);
            return undefined;
        } else {
            const linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${treeFile.treeFolder.path.slice(treeFolder.path.length)}`;
        }
    }


    /**
     * Returns the route from the folder of a TreeFolder to one of its subfolders
     * @param treeFolder
     * @param treeSubfolder
     */
    getRouteFromFolderToSubFolder(treeFolder: TreeFolder, treeSubfolder: TreeFolder): string {
        if (!treeFolder || !treeSubfolder|| treeSubfolder.path === treeFolder.path ) {
            return undefined;
        }
        if (treeSubfolder.path.slice(0, treeFolder.path.length) !== treeFolder.path) {
            console.log(`The folder ${treeSubfolder.path} is not a subfolder of ${treeFolder.path}`);
            return undefined;
        } else {
            const linkStarter = treeFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${treeSubfolder.path.slice(treeFolder.path.length)}`;
        }
    }

}
