import { AstNode } from './ast-node.model';
import { Evaluate } from '../../../ast-to-reports/interfaces/evaluate.interface';
import { AstFileService } from '../../../ast-to-reports/services/ast/ast-file.service';
import { AstFolder } from './ast-folder.model';
import { AstMethod } from './ast-method.model';
import { ComplexitiesByStatus } from '../../../ast-to-reports/interfaces/complexities-by-status.interface';
import { CpxFactors } from '../../../ast-to-reports/models/cpx-factor/cpx-factors.model';
import { Stats } from '../../../ast-to-reports/models/stats.model';
import { AstMethodService } from '../../../ast-to-reports/services/ast/ast-method.service';
import { Logg } from '../../interfaces/logg.interface';
import * as chalk from 'chalk';

export class AstFile implements Evaluate, Logg {

    #astFolder?: AstFolder = undefined;                         // The AstFolder which includes this AstFile
    #astMethods?: AstMethod[] = [];                             // The AstMethods included in this AstFile
    #astNode?: AstNode = undefined;                             // The AstNode corresponding to the file itself
    #astNodes?: AstNode[] = undefined;                          // Array of all the AstNodes which are children of this.AstNode (including itself)
    #complexitiesByStatus?: ComplexitiesByStatus = undefined;   // The file complexities spread by complexity status
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #end: number = undefined;
    #name: string = undefined;
    #stats?: Stats = undefined;                                  // The statistics of the file
    #text ?= '';



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astFolder(): AstFolder {
        return this.#astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this.#astFolder = astFolder;
    }


    get astMethods(): AstMethod[] {
        if (this.#astMethods) {
            return this.#astMethods;
        }
        return
    }


    set astMethods(astMethods: AstMethod[]) {
        this.#astMethods = astMethods;
    }


    get astNode(): AstNode {
        return this.#astNode;
    }


    set astNode(astNode: AstNode) {
        this.#astNode = astNode;
    }


    get astNodes() : AstNode[] {
        return this.#astNodes;
    }


    set astNodes(astNodes: AstNode[])  {
        this.#astNodes = astNodes;
    }


    get complexitiesByStatus(): ComplexitiesByStatus {
        return this.#complexitiesByStatus;
    }


    set complexitiesByStatus(cpxByStatus: ComplexitiesByStatus) {
        this.#complexitiesByStatus = cpxByStatus;
    }


    get cpxFactors(): CpxFactors {
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


    get end(): number {
        return this.#end ?? this.#astNode?.end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get name(): string {
        return this.#name ?? this.#astNode?.name;
    }


    set name(name: string) {
        this.#name = name;
    }


    get stats(): Stats {
        return this.#stats;
    }


    set stats(stats: Stats) {
        this.#stats = stats;
    }


    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.#text = text;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexities of the AstNodes and the AstMethods of this AstFile
     */
    evaluate(): void {
        this.cpxFactors = new CpxFactors();
        const astMethodService = new AstMethodService();
        this.astNode.evaluate();
        for (const method of this.astMethods) {
            method.evaluate();
            // this.cpxIndex += method.cpxIndex;
            this.cyclomaticCpx = this.cyclomaticCpx + method.cyclomaticCpx;
            this.complexitiesByStatus = astMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }


    /**
     * Gets the stats of this AstFile
     */
    getStats(): Stats {
        if (!this.stats) {
            const astFileService =new AstFileService();      // The service for AstFiles
            this.stats = astFileService.getStats(this);
        }
        return this.stats;
    }


    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('astNode :'), this.astNode?.kind);
        console.log(chalk.blueBright('astFolder :'), this.astFolder?.path);
    }


}
