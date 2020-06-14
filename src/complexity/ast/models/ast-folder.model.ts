import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { HasStats } from '../../interfaces/has-stats';
import { Evaluable } from '../../models/evaluable.model';
import { Stats } from '../../models/stats.model';
import { AstFile } from './ast-file.model';
import { AstFolderService } from '../services/ast-folder.service';

/**
 * Element of the TreeNode structure corresponding to a given folder
 */
export class AstFolder extends Evaluable implements HasStats {

    complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();   // The folder complexities spread by complexity status
    cpxIndex ?= 0;                                                              // The complexity index of this folder
    numberOfFiles ?= 0;                                                         // The number of files in this folder and its subfolders
    numberOfMethods ?= 0;                                                       // The number of methods included in all the files of this folder and its subfolders
    parent?: AstFolder = undefined;                                            // The AstFolder corresponding to the parent folder of this AstFolder
    #path?: string = undefined;                                                                 // The absolute path of this folder
    relativePath ?= '';                                                         // The relative path of this folder
    stats: Stats = undefined;                                                   // The stats corresponding to this folder
    children?: AstFolder[] = [];                                             // The subfolders of this folder
    astFiles?: AstFile[] = [];                                                // The array of files of this folder (not in the subfolders)
    astFolderService?: AstFolderService = new AstFolderService();            // The AstFolderService linked to this AstFolder


    constructor() {
        super();
        this.astFolderService.treeFolder = this;
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.#path = path;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Gets the stats of this TreeFile
     */
    getStats(): Stats {
        // if (!this.stats) {
        //     this.stats = this.astFolderService.getStats(this);
        // }
        return this.stats;
    }


    /**
     * Evaluates the complexities of the TreeFiles of this AstFolder
     */
    evaluate(): void {
        for (const file of this.astFiles) {
            // this.cpxIndex += file.cpxIndex;
            // this.cyclomaticCpx += file.cyclomaticCpx;
            // this.numberOfMethods += file.treeMethods?.length ?? 0;
            // this.numberOfFiles++;
            // this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    }

}
