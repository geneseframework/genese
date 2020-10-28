import { StatsService } from '../report/stats.service';
import { Stats } from '../../models/stats.model';
import { AstFolder } from '../../models/ast/ast-folder.model';
import { AstFile } from '../../models/ast/ast-file.model';
import { ComplexityType } from '../../enums/complexity-type.enum';
import { BarchartService } from '../report/barchart.service';
import { constructLink, getOS } from '../../../core/services/file.service';
import { OS } from '../../enums/os.enum';
import { RowFileReport } from '../../models/report/row-file-report.model';
import { AstMethodService } from './ast-method.service';

/**
 * - AstFolders generation from Abstract Syntax AstNode of a folder
 * - Other services for AstFolders
 */
export class AstFolderService extends StatsService {

    protected _stats: Stats = undefined;                            // The statistics of the AstFolder
    astFolder: AstFolder = undefined;                               // The AstFolder corresponding to this service
    private methodsArrayReport: RowFileReport[] = [];  

    constructor() {
        super();
    }

    /**
     * Get the array of methods sorted by decreasing cognitive complexity
     * @param astFolder    // The AstFolder to analyse
     */
    getMethodsArraySortedByDecreasingCognitiveCpx(astFolder: AstFolder): RowFileReport[] {
        this.setMethodsArrayReport(astFolder);
        return AstMethodService.sortByDecreasingCognitiveCpx(this.methodsArrayReport); 
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
        this._stats.setPercentages();
        return this._stats;
    }

    /**
     * Recursion setting the array of methods reports of each subFolder
     * @param astFolder    // The AstFolder to analyse
     */
    private setMethodsArrayReport(astFolder: AstFolder): void {
        for (const subFolder of astFolder.children) {
            this.setTsFileReport(subFolder);
            this.setMethodsArrayReport(subFolder);
        }
    }

    /**
     * Recursion setting the array of methods reports of each subFolder's files
     * @param astFolder    // The AstFolder to analyse
     */
    private setTsFileReport(astFolder: AstFolder): void{
        for (const tsFile of astFolder.astFiles){
            this.setAstMethodReport(tsFile)
        }
    }

    /**
     * Recursion setting the array of methods reports of each file's methods
     * @param astFile    // The AstFile to analyse
     */
    private setAstMethodReport(astFile: AstFile): void{
        for (const astMethod of astFile.astMethods) {
            this.methodsArrayReport.push({
                cognitiveColor: astMethod.cognitiveStatus.toLowerCase(),
                cpxIndex: astMethod.cpxIndex,
                cyclomaticColor: astMethod.cyclomaticStatus.toLowerCase(),
                cyclomaticValue: astMethod.cyclomaticCpx,
                filename: astFile.name,
                linkFile: undefined,
                methodName: astMethod.name
            })
        }
    }

    /**
     * Calculates and sets to _stats the Complexities by Status of a given AstFolder
     * @param astFolder        // The AstFolder to analyse
     */
    private calculateAstFolderCpxByStatus(astFolder: AstFolder): void {
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
    private calculateAstFileCpxByStatus(astFile: AstFile): void {
        this.incrementMethodsByStatus(ComplexityType.COGNITIVE, astFile.stats);
        this.incrementMethodsByStatus(ComplexityType.CYCLOMATIC, astFile.stats);
        this._stats.barChartCognitive = BarchartService.concat(this._stats.barChartCognitive, astFile.stats.barChartCognitive);
        this._stats.barChartCyclomatic = BarchartService.concat(this._stats.barChartCyclomatic, astFile.stats.barChartCyclomatic);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param type              // The complexity type
     * @param tsFileStats
     */
    private incrementMethodsByStatus(type: ComplexityType, tsFileStats: Stats): void {
        this._stats.numberOfMethodsByStatus[type].correct += tsFileStats.numberOfMethodsByStatus[type].correct;
        this._stats.numberOfMethodsByStatus[type].error += tsFileStats.numberOfMethodsByStatus[type].error;
        this._stats.numberOfMethodsByStatus[type].warning += tsFileStats.numberOfMethodsByStatus[type].warning;
    }


    /**
     * Sets the relative path of an AstFolder
     */
    protected setNameOrPath(astFolder: AstFolder): void {
        this._stats.subject = astFolder.relativePath;
    }


    /**
     * Returns the number of files of an astFolder and its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    getNumberOfFiles(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbFiles = astFolder.astFiles.length;
        nbFiles += this.getChildrenFoldersNumberOfFiles(astFolder);
        return nbFiles;
    }


    /**
     * Returns the number of files of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    private getChildrenFoldersNumberOfFiles(astFolder: AstFolder): number {
        let nbFiles = 0;
        for (const childAstFolder of astFolder.children) {
            nbFiles += childAstFolder.astFiles?.length;
            nbFiles += this.getChildrenFoldersNumberOfFiles(childAstFolder);
        }
        return nbFiles;
    }


    /**
     * Returns the number of methods of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    getNumberOfMethods(astFolder: AstFolder): number {
        if (!astFolder?.astFiles) {
            return 0;
        }
        let nbMethods = this.getCurrentFolderNumberOfMethods(astFolder);
        nbMethods += this.getChildrenFoldersNumberOfMethods(astFolder);
        return nbMethods;
    }


    /**
     * Returns the number of methods of a given AstFolder without its subfolders
     * @param astFolder     // The astFolder to analyse
     */
    private getCurrentFolderNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const astFile of astFolder.astFiles) {
            nbMethods += astFile.astMethods?.length ?? 0;
        }
        return nbMethods;
    }


    /**
     * Returns the number of methods of the subfolders of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    private getChildrenFoldersNumberOfMethods(astFolder: AstFolder): number {
        let nbMethods = 0;
        for (const childAstFolder of astFolder.children) {
            nbMethods += this.getCurrentFolderNumberOfMethods(childAstFolder);
            nbMethods += this.getChildrenFoldersNumberOfMethods(childAstFolder);
        }
        return nbMethods;
    }


    /**
     * Returns the route from the root ancestor to the folder of a given AstFolder
     * @param astFolder     // The astFolder to analyse
     */
    getRelativePath(astFolder: AstFolder): string {
        return astFolder?.path?.slice(this.getRootPath(astFolder).length);
    }


    /**
     * Returns the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    private getAstFolderRoot(astFolder: AstFolder): AstFolder {
        if (!astFolder?.parent) {
            return astFolder;
        }
        return this.getAstFolderRoot(astFolder.parent);
    }


    /**
     * Returns the path of the ancestor of all the astFolders
     * @param astFolder     // The astFolder to analyse
     */
    private getRootPath(astFolder: AstFolder): string {
        return this.getAstFolderRoot(astFolder)?.path;
    }


    /**
     * Returns the path between a AstFolder's path and a AstFile's path which is inside it or inside one of its subfolders
     * @param astFolder      // The path of the AstFolder
     * @param astFile        // The path of the AstFile
     */
    getRouteFromFolderToFile(astFolder: AstFolder, astFile: AstFile): string {
        if (astFile?.astFolder.path.slice(0, astFolder?.path.length) === astFolder?.path) {
            const linkStarter = this.getLinkStarter(astFolder);

            return `${linkStarter}${astFile.astFolder.path.slice(
                astFolder.path.length
            )}`;
        } else {
            console.log(`The file ${astFile.name} is not inside the folder ${astFolder.path}`);
            return undefined;
        }
    }

    /**
     * Get the starter link 
     * @param astFolder         // The concerned astFolder 
     */
    getLinkStarter(astFolder: AstFolder) {
        return getOS() !== OS.WINDOWS ? astFolder?.relativePath === "" ? "./" : "." : astFolder?.relativePath === "" ? "./" : ""
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

            const linkStarter = this.getLinkStarter(astFolder);

            const finalLink = `${linkStarter}${this.linkSlicer(
                astSubfolder.path,
                astFolder.path
            )}`;

            return finalLink;
        }
    }

    /**
     * Return if slash exists on string
     * @param text          // Text to analyse
     * @param parentText    // Parent text to analyse 
     */
    isSlashExist(text: string, parentText: string) {
        return constructLink(text[parentText.length + 1]) === constructLink("/");
    }

    /**
     * Return string section separate by a slash from a string 
     * @param text          // Text to analyse
     * @param parentText    // Parent text to analyse
     */
    linkSlicer(text: string, parentText: string): string {
        return this.isSlashExist(text, parentText)
            ? text.slice(parentText.length + 1)
            : text.slice(parentText.length);
    }

}
