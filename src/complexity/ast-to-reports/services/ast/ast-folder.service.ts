import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { AstFileService } from './ast-file.service';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { ComplexityType } from '../../enums/complexity-type.enum';
import * as chalk from 'chalk';
import { BarchartService } from '../report/barchart.service';

/**
 * - AstFolders generation from Abstract Syntax AstNode of a folder
 * - Other services for AstFolders
 */
export class AstFolderService extends StatsService {

    protected _stats: Stats = undefined;                        // The statistics of the AstFolder
    astFileService?: AstFileService = new AstFileService();  // The service managing AstFiles
    astFolder: AstFolder = undefined;                         // The AstFolder corresponding to this service

    constructor() {
        super();
    }


    /**
     * Calculates the statistics of the AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    calculateStats(astFolder: AstFolder): Stats {
        this._stats = new Stats();
        this._stats.subject = astFolder.relativePath === '' ? astFolder.path : astFolder.relativePath;
        this._stats.numberOfFiles = astFolder.numberOfFiles;
        this._stats.numberOfMethods = astFolder.numberOfMethods;
        this._stats.totalCognitiveComplexity = astFolder.cpxFactors.total;
        this._stats.totalCyclomaticComplexity = astFolder.cyclomaticCpx;
        this.calculateAstFolderCpxByStatus(astFolder);
        return this._stats;
    }


    calculateAstFolderCpxByStatus(astFolder: AstFolder): void {
        for (const astFile of astFolder.astFiles) {
            this.calculateAstFileCpxByStatus(astFile);
        }
        for (const childAstFolder of astFolder.children) {
            this.calculateAstFolderCpxByStatus(childAstFolder);
        }
    }


    /**
     * Increments AstFolder statistics for a given astFile
     * @param astFile       // The AstFile to analyse
     */
    calculateAstFileCpxByStatus(astFile: AstFile): void {
        let tsFileStats = astFile.getStats();
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
        // console.log('ASTFOLDERRR STATS', this._stats.numberOfMethodsByStatus)

    }


    /**
     * Returns the path of the AstFolder linked to this service
     */
    getNameOrPath(astFolder: AstFolder): void {
        console.log('ABSSS', astFolder.path)
        console.log('RELLLL', astFolder.relativePath)
        this._stats.subject = astFolder.relativePath;
        // this._stats.subject = getRelativePath(Options.pathCommand, astFolder.path);
    }


    getNumberOfFiles(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbFiles = astFolder.astFiles.length;
        nbFiles += this.getChildrenFoldersNumberOfFiles(astFolder);
        return nbFiles;
    }


    private getChildrenFoldersNumberOfFiles(astFolder: AstFolder): number {
        let nbFiles = 0;
        for (const childAstFolder of astFolder.children) {
            nbFiles += childAstFolder.astFiles?.length;
            nbFiles += this.getChildrenFoldersNumberOfFiles(childAstFolder);
        }
        return nbFiles;
    }


    getNumberOfMethods(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbMethods = this.getCurrentFolderNumberOfMethods(astFolder);
        nbMethods += this.getChildrenFoldersNumberOfMethods(astFolder);
        return nbMethods;
    }


    private getCurrentFolderNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const astFile of astFolder.astFiles) {
            nbMethods += astFile.astMethods?.length ?? 0;
        }
        return nbMethods;
    }


    private getChildrenFoldersNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const childAstFolder of astFolder.children) {
            nbMethods += this.getCurrentFolderNumberOfMethods(childAstFolder);
            nbMethods += this.getChildrenFoldersNumberOfMethods(childAstFolder);
        }
        return nbMethods;
    }


    getAstFolderRoot(astFolder: AstFolder): AstFolder {
        if (!astFolder?.parent) {
            return astFolder;
        }
        return this.getAstFolderRoot(astFolder.parent);
    }


    getRootPath(astFolder: AstFolder): string {
        return this.getAstFolderRoot(astFolder)?.path;
    }


    getRelativePath(astFolder: AstFolder): string {
        return astFolder?.path?.slice(this.getRootPath(astFolder).length);
    }


    /**
     * Returns the path between a AstFolder's path and a AstFile's path which is inside it or inside one of its subfolders
     * @param astFolder      // The path of the AstFolder
     * @param astFile        // The path of the AstFile
     */
    getRouteFromFolderToFile(astFolder: AstFolder, astFile: AstFile): string {
        if (!astFile || !astFolder) {
            return undefined;
        }
        if (astFile.astFolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The file ${astFile.name} is not inside the folder ${astFolder.path}`);
            return undefined;
        } else {
            const linkStarter = astFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${astFile.astFolder.path.slice(astFolder.path.length)}`;
        }
    }


    /**
     * Returns the route from the folder of a AstFolder to one of its subfolders
     * @param astFolder
     * @param astSubfolder
     */
    getRouteFromFolderToSubFolder(astFolder: AstFolder, astSubfolder: AstFolder): string {
        if (!astFolder || !astSubfolder|| astSubfolder.path === astFolder.path ) {
            return undefined;
        }
        if (astSubfolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The folder ${astSubfolder.path} is not a subfolder of ${astFolder.path}`);
            return undefined;
        } else {
            const linkStarter = astFolder.relativePath === '' ? './' : '.';
            return `${linkStarter}${astSubfolder.path.slice(astFolder.path.length + 1)}`;
        }
    }

}
