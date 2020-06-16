import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { AstFileService } from './ast-file.service';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { ComplexityType } from '../../enums/complexity-type.enum';

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
        this._stats.numberOfFiles += astFolder?.astFiles?.length ?? 0;
        for (const file of astFolder.astFiles) {
            this.incrementFileStats(file);
        }
        for (const subFolder of astFolder.children) {
            this.calculateStats(subFolder);
        }
        return this._stats;
    }


    /**
     * Increments AstFolder statistics for a given astFile
     * @param astFile       // The AstFile to analyse
     */
    incrementFileStats(astFile: AstFile): void {
        if (!astFile) {
            return;
        }
        let tsFileStats = astFile.getStats();
        this._stats.numberOfMethods += tsFileStats.numberOfMethods;
        // this.incrementMethodsByStatus(ComplexityType.COGNITIVE, tsFileStats);
        // this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, tsFileStats);
        // this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, tsFileStats.barChartCognitive);
        // this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, tsFileStats.barChartCyclomatic);
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
    getNameOrPath(astFolder: AstFolder): void {
        // this._stats.subject = getRelativePath(Options.pathCommand, astFolder.path);
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
        console.log('ASTFOLDERPATHHH', astFile.name, astFolder.parent?.path, astFolder.path)
        if (astFile.astFolder.path.slice(0, astFolder.path.length) !== astFolder.path) {
            console.log(`The file ${astFile.name} is not inside the folder ${astFolder.path}`);
            return undefined;
        } else {
            return;
            // const linkStarter = astFolder.relativePath === '' ? './' : '.';
            // return `${linkStarter}${astFile.astFolder.path.slice(astFolder.path.length)}`;
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
            return ;
            // const linkStarter = astFolder.relativePath === '' ? './' : '.';
            // return `${linkStarter}${astSubfolder.path.slice(astFolder.path.length)}`;
        }
    }

}
