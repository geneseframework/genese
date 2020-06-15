import { AstNode } from './ast-node.model';
import { SyntaxKind } from '../../enums/syntax-kind.enum';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { LogService } from '../../services/log.service';
import { AstFileService } from '../../services/ast/ast-file.service';
import { AstFolder } from './ast-folder.model';
import { AstMethod } from './ast-method.model';
import { ComplexitiesByStatus } from '../../interfaces/complexities-by-status.interface';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { Stats } from '../stats.model';
import { AstMethodService } from '../../services/ast/ast-method.service';

export class AstFile implements Evaluate, LogService {

    astFileService: AstFileService = new AstFileService();      // The service for AstFiles
    #astFolder?: AstFolder = undefined;                         // The AstFolder which includes this AstFile
    #astMethods?: AstMethod[] = [];                             // The AstMethods included in this AstFile
    #astNode?: AstNode = undefined;                             // The AstNode corresponding to the file itself
    // #children: AstNode[] = [];
    #complexitiesByStatus?: ComplexitiesByStatus = undefined;   // The file complexities spread by complexity status
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #end ?= 0;
    #name ?= '';
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
        // if (this.#astNode) {
        //     return this.astNode;
        // }
        // const astNode = new AstNode();
        // astNode.pos = 0;
        // astNode.end = this.text.length; // TODO: fix
        // astNode.kind = SyntaxKind.SourceFile;
        // astNode.children = this.children;
        // this.#astNode = astNode
        // return astNode;
    }


    set astNode(astNode: AstNode) {
        this.#astNode = astNode;
    }


    // get children(): AstNode[] {
    //     return this.#children;
    // }
    //
    //
    // set children(astNodes: AstNode[]) {
    //     this.#children = astNodes;
    // }

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
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get name(): string {
        return this.#name;
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
        // TODO : init AstMethods and loop on them
        const astMethodService = new AstMethodService();
        for (const child of this.#astNode.children) {
            child.evaluate();
        }
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
            this.stats = this.astFileService.getStats(this);
        }
        return this.stats;
    }


    logg(message?: string): void {
        console.log('-----------------------------');
        console.log('LOG AST_FILE');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log('name', this.name);
        console.log('end', this.#end);
        console.log('text', this.#text);
        console.log('astNode', this.#astNode);
        console.log('astFolder', this.#astFolder);
    }


}
