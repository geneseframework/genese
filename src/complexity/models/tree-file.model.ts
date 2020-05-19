import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { TreeFolder } from './tree-folder.model';
import { TreeFileService } from '../services/tree-file.service';
import { Stats } from './stats.model';
import { ComplexitiesByStatus } from '../interfaces/complexities-by-status.interface';
import { Evaluable } from './evaluable.model';
import { HasStats } from '../interfaces/has-stats';
import { TreeMethodService } from '../services/tree-method.service';

/**
 * Element of the Tree structure corresponding to a given file (AST sourceFile)
 */
export class TreeFile extends Evaluable implements HasStats {

    complexitiesByStatus?: ComplexitiesByStatus = undefined;    // The file complexities spread by complexity status
    name ?= '';                                                 // The name of the file
    sourceFile?: ts.SourceFile = undefined;                     // The sourceFile corresponding to this TreeFile
    stats?: Stats = undefined;                                  // The statistics of the file
    treeFileService: TreeFileService = undefined;               // The service for TreeFiles
    treeFolder?: TreeFolder = new TreeFolder();                 // The TreeFolder which includes this TreeFile
    treeMethods?: TreeMethod[] = [];                            // The TreeMethods included in this TreeFile


    constructor() {
        super();
        this.treeFileService = new TreeFileService(this);
    }


    /**
     * Evaluates the complexities of this TreeFile
     */
    evaluate(): void {
        const cpbss = new TreeMethodService();
        for (const method of this.treeMethods) {
            this.cognitiveValue += method.cognitiveValue;
            this.cyclomaticValue += method.cyclomaticValue;
            this.complexitiesByStatus = cpbss.addMethodCpxByStatus(this.complexitiesByStatus, method);
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
