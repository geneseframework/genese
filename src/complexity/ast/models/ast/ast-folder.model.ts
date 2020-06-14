/**
 * Element of the TreeNode structure corresponding to a given folder
 */
import { Evaluate } from '../../interfaces/evaluate.interface';
import { HasStats } from '../../interfaces/has-stats';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { Stats } from '../stats.model';
import { AstFile } from './ast-file.model';

export class AstFolder implements Evaluate, HasStats {

    #complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();   // The folder complexities spread by complexity status
    #cpxFactors?: CpxFactors = undefined;
    // cpxIndex ?= 0;                                                              // The complexity index of this folder
    #cyclomaticCpx ?= 0;
    // numberOfFiles ?= 0;                                                         // The number of files in this folder and its subfolders
    // numberOfMethods ?= 0;                                                       // The number of methods included in all the files of this folder and its subfolders
    #parent?: AstFolder = undefined;                                            // The AstFolder corresponding to the parent folder of this AstFolder
    #path?: string = undefined;                                                                 // The absolute path of this folder
    // relativePath ?= '';                                                         // The relative path of this folder
    #stats: Stats = undefined;                                                   // The stats corresponding to this folder
    children?: AstFolder[] = [];                                             // The subfolders of this folder
    astFiles?: AstFile[] = [];                                                // The array of files of this folder (not in the subfolders)
    // initService?: InitService = new InitService();            // The InitService linked to this AstFolder


    constructor() {
        // this.initService.treeFolder = this;
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get complexitiesByStatus(): ComplexitiesByStatus {
        return this.#complexitiesByStatus;
    }


    set complexitiesByStatus(complexitiesByStatus: ComplexitiesByStatus) {
        this.#complexitiesByStatus = complexitiesByStatus;
    }



    get cpxFactors(): CpxFactors {
        if (this.#cpxFactors) {
            return this.#cpxFactors;
        }
        this.evaluate();
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    get parent(): AstFolder {
        return this.#parent;
    }


    set parent(parent: AstFolder) {
        this.#parent = parent;
    }


    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.#path = path;
    }


    // TODO : implement
    get relativePath(): string {
        return this.#path;
    }


    get stats(): Stats {
        return this.#stats;
    }



    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------



    /**
     * Evaluates the complexities of the TreeFiles of this AstFolder
     */
    evaluate(): void {
        this.cpxFactors = new CpxFactors();
        for (const astFile of this.astFiles) {
            // TODO : evaluate AstFile
            // astFile.evaluate();
            this.cpxFactors = this.cpxFactors.add(astFile.cpxFactors);
            console.log('EVAL AST FILE')
            this.cyclomaticCpx = this.cyclomaticCpx + astFile.cyclomaticCpx;
            // this.numberOfMethods += file.treeMethods?.length ?? 0;
            // this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(astFile.complexitiesByStatus);
        }
    }

}
