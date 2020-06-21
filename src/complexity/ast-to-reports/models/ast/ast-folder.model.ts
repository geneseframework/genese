/**
 * Element of the TreeNode structure corresponding to a given folder
 */
import { Evaluate } from '../../interfaces/evaluate.interface';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { Stats } from '../stats.model';
import { AstFile } from './ast-file.model';
import { AstFolderService } from '../../services/ast/ast-folder.service';
import { Logg } from '../../../core/interfaces/logg.interface';
import * as chalk from 'chalk';
import { AstNode } from './ast-node.model';

export class AstFolder implements Evaluate, Logg {

    #astFiles?: AstFile[] = [];                                                     // The array of files of this folder (not in the subfolders)
    #astFolderService?: AstFolderService = new AstFolderService();
    #children?: AstFolder[] = [];                                                   // The subfolders of this folder
    #complexitiesByStatus?: ComplexitiesByStatus = new ComplexitiesByStatus();      // The folder complexities spread by complexity status
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #numberOfFiles: number = undefined;
    #numberOfMethods: number = undefined;
    #parent?: AstFolder = undefined;                                                // The AstFolder corresponding to the parent folder of this AstFolder
    #path?: string = undefined;                                                     // The absolute path of this folder
    #relativePath?: string = undefined;                                             // The relative path of this folder compared to the root folder of the analyse
    #stats: Stats = undefined;                                                      // The stats corresponding to this folder


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astFiles(): AstFile[] {
        return this.#astFiles;
    }


    set astFiles(astFiles: AstFile[]) {
        this.#astFiles = astFiles;
    }


    get children(): AstFolder[] {
        return this.#children;
    }


    set children(children: AstFolder[]) {
        this.#children = children;
    }


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


    get numberOfFiles(): number {
        return this.#numberOfFiles ?? this.#astFolderService.getNumberOfFiles(this);
    }


    set numberOfFiles(numberOfFiles: number) {
        this.#numberOfFiles = numberOfFiles;
    }


    get numberOfMethods(): number {
        return this.#numberOfMethods ?? this.#astFolderService.getNumberOfMethods(this);
    }


    set numberOfMethods(numberOfMethods: number) {
        this.#numberOfMethods = numberOfMethods;
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


    get relativePath(): string {
        return this.#relativePath ?? this.#astFolderService.getRelativePath(this);
    }


    get stats(): Stats {
        return this.#stats;
    }


    set stats(stats: Stats) {
        this.#stats = stats;
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
            astFile.evaluate();
            this.cpxFactors = this.cpxFactors.add(astFile.cpxFactors);
            this.cyclomaticCpx = this.cyclomaticCpx + astFile.cyclomaticCpx;
            this.complexitiesByStatus = this.complexitiesByStatus.add(astFile.complexitiesByStatus);
        }
        for (const childAstFolder of this.children) {
            childAstFolder.evaluate();
        }
        this.numberOfMethods = this.#astFolderService.getNumberOfMethods(this);
        this.stats = this.#astFolderService.calculateStats(this);
    }


    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), this.parent?.path);
        for (const astFile of this.astFiles) {
            const name = astFile?.name ?? '';
            console.log(chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile?.astNode, `  `)
        }
    }


    loggChildren(astNode: AstNode, indent = ''): void {
        for (const childAstNode of astNode?.children) {
            const name = childAstNode?.name ?? '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `)
        }
    }

}
