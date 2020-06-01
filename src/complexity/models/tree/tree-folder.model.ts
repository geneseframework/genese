import { TreeFile } from './tree-file.model';
import { TreeFolderService } from '../../services/tree/tree-folder.service';
import { Stats } from '../stats.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { Evaluable } from '../evaluable.model';
import { HasStats } from '../../interfaces/has-stats';

/**
 * Element of the TreeNode structure corresponding to a given folder
 */
export class TreeFolder extends Evaluable implements HasStats {

    complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();   // The folder complexities spread by complexity status
    cpxIndex ?= 0;                                                              // The complexity index of this folder
    numberOfFiles ?= 0;                                                         // The number of files in this folder and its subfolders
    numberOfMethods ?= 0;                                                       // The number of methods included in all the files of this folder and its subfolders
    parent?: TreeFolder = undefined;                                            // The TreeFolder corresponding to the parent folder of this TreeFolder
    path ?= '';                                                                 // The absolute path of this folder
    relativePath ?= '';                                                         // The relative path of this folder
    stats: Stats = undefined;                                                   // The stats corresponding to this folder
    subFolders?: TreeFolder[] = [];                                             // The subfolders of this folder
    treeFiles?: TreeFile[] = [];                                                // The array of files of this folder (not in the subfolders)
    treeFolderService?: TreeFolderService = new TreeFolderService();                          // The TreeFolderService linked to this TreeFolder


    constructor() {
        super();
        this.treeFolderService.treeFolder = this;
    }


    /**
     * Gets the stats of this TreeFile
     */
    getStats(): Stats {
        if (!this.stats) {
            this.stats = this.treeFolderService.getStats(this);
        }
        return this.stats;
    }


    /**
     * Evaluates the complexities of this TreeFolder
     */
    evaluate(): void {
        for (const file of this.treeFiles) {
            this.cpxIndex += file.cpxIndex;
            this.cyclomaticCpx += file.cyclomaticCpx;
            this.numberOfMethods += file.treeMethods?.length ?? 0;
            this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    }

}
