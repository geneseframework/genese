import * as fs from 'fs-extra';
import { TreeFolder } from '../../models/tree/tree-folder.model';
import { getFileExtension, getLanguageExtensions, getRelativePath } from '../file.service';
import { TreeFileService } from './tree-file.service';
import { TreeFile } from '../../models/tree/tree-file.model';
import { BarchartService } from '../report/barchart.service';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { Options } from '../../models/options';
import { DEBUG } from '../../main';
import { JsonAst } from '../../ast/models/json-ast.model';
import { LanguageToJsonAstService } from '../../ast/services/language-to-json-ast.service';
import { Language } from '../../ast/enums/language.enum';
import { AstFileService } from '../../ast/services/ast-file.service';

/**
 * - TreeFolders generation from Abstract Syntax TreeNode of a folder
 * - Other services for TreeFolders
 */
export class TreeFolderService extends StatsService {

    protected _stats: Stats = undefined;                        // The statistics of the AstFolder
    treeFileService?: TreeFileService = new TreeFileService();  // The service managing TreeFiles
    treeFolder: TreeFolder = undefined;                         // The AstFolder corresponding to this service

    constructor() {
        super();
    }


    /**
     * Generates the AstFolder for a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the folder
     * @param path              // The path of the folder
     * @param language         // The extension of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The AstFolder of a subfolder (param useful only for recursivity, should not be used outside of the method)
     */
    generateTree(path: string, language?: Language, treeSubFolder?: TreeFolder): TreeFolder {
        if (!path) {
            console.log('ERROR: no path.')
            return undefined;
        }
        const treeFolder: TreeFolder = new TreeFolder();
        treeFolder.path = path;
        treeFolder.relativePath = getRelativePath(Options.pathFolderToAnalyze, path);
        const filesOrDirs = fs.readdirSync(path);
        filesOrDirs.forEach((elementName: string) => {
            const pathElement = path + elementName;
            if (!Options.isIgnored(pathElement)) {
                this.generateFileOrDirTree(pathElement, language, treeSubFolder, treeFolder);
            }
        });
        treeFolder.evaluate();
        return treeFolder;
    }


    /**
     * Generates the AstFolder of a treeSubFolder which is a child of a given treeFolder with the path 'pathElement'
     * @param pathElement       // The path of the element
     * @param language          // The language of the files concerned by the generation (actually: only .ts)
     * @param treeSubFolder     // The AstFolder of a subfolder of the param treeFolder
     * @param treeFolder        // The parent AstFolder
     */
    private generateFileOrDirTree(pathElement: string, language: Language, treeSubFolder: TreeFolder, treeFolder: TreeFolder): void {
        if (fs.statSync(pathElement).isDirectory()) {
            let subFolder = new TreeFolder();
            subFolder = this.generateTree(`${pathElement}/`, language, subFolder);
            subFolder.parent = treeSubFolder;
            subFolder.path = pathElement;
            treeFolder.subFolders.push(subFolder);
        } else if (!language || getLanguageExtensions(language).includes(getFileExtension(pathElement))) {
            if (!DEBUG || (DEBUG && pathElement === './src/complexity/mocks/debug.mock.ts')) {
                treeFolder.treeFiles.push(this.treeFileService.generateTree(pathElement, treeFolder));
            }
        }
    }


    /**
     * Calculates the statistics of the AstFolder
     * @param treeFolder        // The AstFolder to analyse
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
     * Increments AstFolder statistics for a given treeFile
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
     * Returns the path of the AstFolder linked to this service
     */
    getNameOrPath(treeFolder: TreeFolder): void {
        this._stats.subject = getRelativePath(Options.pathCommand, treeFolder.path);
    }


    /**
     * Returns the path between a AstFolder's path and a TreeFile's path which is inside it or inside one of its subfolders
     * @param treeFolder      // The path of the AstFolder
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
     * Returns the route from the folder of a AstFolder to one of its subfolders
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
