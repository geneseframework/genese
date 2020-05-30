import { TreeFolder } from '../models/tree-folder.model';
import { TreeFile } from '../models/tree-file.model';
import { Ast } from './ast.service';
import { TreeMethod } from '../models/tree-method.model';
import { MethodStatus } from '../enums/evaluation-status.enum';
import { ComplexityType } from '../enums/complexity-type.enum';
import { StatsService } from './stats.service';
import { Stats } from '../models/stats.model';
import { TreeMethodService } from './tree-method.service';

/**
 * - TreeFiles generation from Abstract Syntax TreeNode of a file
 * - Other services for TreeFiles
 */
export class TreeFileService extends StatsService{

    protected _stats: Stats = undefined;            // The statistics of the TreeFile
    treeFile: TreeFile = undefined;                 // The TreeFile corresponding to this service
    treeMethodService?: TreeMethodService = new TreeMethodService();

    constructor() {
        super();
    }


    /**
     * Generates the TreeFile for a given file of a given folder
     * The tree is generated according to the Abstract Syntax TreeNode (AST) of the file
     * @param path          // The path of the file
     * @param treeFolder      // The TreeFolder containing the TreeFile
     */
    generateTree(path: string, treeFolder: TreeFolder = new TreeFolder()): TreeFile {
        const tsFile: TreeFile = new TreeFile();
        tsFile.sourceFile = Ast.getSourceFile(path);
        tsFile.treeFolder = treeFolder;
        tsFile.name = tsFile.sourceFile?.fileName;
        tsFile.treeMethods = this.treeMethodService.generateTree(tsFile);
        tsFile.evaluate();
        return tsFile;
    }


    /**
     * Calculates the statistics of the TreeFile
     * @param treeFile    // The TreeFile to analyse
     */
    calculateStats(treeFile: TreeFile): void {
        this._stats.numberOfMethods = treeFile.treeMethods?.length ?? 0;
        for (const method of treeFile.treeMethods) {
            this.incrementStats(method);
        }
    }


    /**
     * Increments TreeFile statistics for a given method
     * @param treeMethod    // The TreeMethod to analyse
     */
    incrementStats(treeMethod: TreeMethod): void {
        this.incrementStatsMethodsByStatus(treeMethod, ComplexityType.COGNITIVE);
        this.incrementStatsMethodsByStatus(treeMethod, ComplexityType.CYCLOMATIC);
        this._stats.barChartCognitive.addResult(treeMethod.cognitiveValue);
        this._stats.barChartCyclomatic.addResult(treeMethod.cyclomaticCpx);
    }


    /**
     * Increments the number of methods spread by Status (correct, warning, error) and by complexity type
     * @param treeMethod        // The TreeMethod to analyse
     * @param type              // The complexity type
     */
    incrementStatsMethodsByStatus(treeMethod: TreeMethod, type: ComplexityType): void {
        const status = (type === ComplexityType.COGNITIVE) ? treeMethod.cognitiveStatus : treeMethod.cyclomaticStatus;
        switch (status) {
            case MethodStatus.CORRECT:
                this._stats.numberOfMethodsByStatus[type].correct ++;
                break;
            case MethodStatus.ERROR:
                this._stats.numberOfMethodsByStatus[type].error ++;
                break;
            case MethodStatus.WARNING:
                this._stats.numberOfMethodsByStatus[type].warning ++;
                break;
            default:
                break;
        }
    }


    /**
     * Returns the filename of the TreeFile linked to this service
     */
    getNameOrPath(): void {
        this._stats.subject = this.treeFile.name;
    }

}
