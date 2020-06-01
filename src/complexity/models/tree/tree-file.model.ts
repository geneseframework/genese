import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { TreeFolder } from './tree-folder.model';
import { TreeFileService } from '../../services/tree/tree-file.service';
import { Stats } from '../stats.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { Evaluable } from '../evaluable.model';
import { HasStats } from '../../interfaces/has-stats';
import { TreeMethodService } from '../../services/tree/tree-method.service';

/**
 * Element of the TreeNode structure corresponding to a given file (AST sourceFile)
 */
export class TreeFile extends Evaluable implements HasStats {

    complexitiesByStatus?: ComplexitiesByStatus = undefined;    // The file complexities spread by complexity status
    cpxIndex ?= 0;                                              // The complexity index of this file
    name ?= '';                                                 // The name of this file
    sourceFile?: ts.SourceFile = undefined;                     // The sourceFile corresponding to this TreeFile
    stats?: Stats = undefined;                                  // The statistics of the file
    treeFileService: TreeFileService = new TreeFileService();   // The service for TreeFiles
    treeFolder?: TreeFolder = new TreeFolder();                 // The TreeFolder which includes this TreeFile
    treeMethods?: TreeMethod[] = [];                            // The TreeMethods included in this TreeFile


    constructor() {
        super();
        this.treeFileService.treeFile = this;
    }


    /**
     * Evaluates the complexities of this TreeFile
     */
    evaluate(): void {
        const treeMethodService = new TreeMethodService();
        for (const method of this.treeMethods) {
            this.cpxIndex += method.cpxIndex;
            this.cyclomaticCpx += method.cyclomaticCpx;
            this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }


    /**
     * Gets the stats of this TreeFile
     */
    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.treeFileService.getStats(this);
        }
        return this.stats;
    }
}
