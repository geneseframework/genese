import { AstNode } from './ast-node.model';
import { AstKind } from '../enums/ast-kind.enum';
import { LogService } from '../../services/tree/log.service';
import { CpxFactors } from '../../models/cpx-factor/cpx-factors.model';
import { AstFolder } from './ast-folder.model';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { AstMethod } from './ast-method.model';

export class AstFile implements Evaluate, LogService {

    #astMethods?: AstMethod[] = [];                           // The TreeMethods included in this TreeFile
    #children: AstNode[] = [];
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #end ?= 0;
    #name ?= '';
    #text ?= '';
    #astFolder?: AstFolder = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get astMethods(): AstMethod[] {
        return this.#astMethods;
    }


    set astMethods(astMethods: AstMethod[]) {
        this.#astMethods = astMethods;
    }


    get astNode(): AstNode {
        const astNode = new AstNode();
        astNode.pos = 0;
        astNode.end = this.text.length; // TODO: fix
        astNode.kind = AstKind.SOURCE_FILE;
        astNode.children = this.children;
        return astNode;
    }


    get children(): AstNode[] {
        return this.#children;
    }


    set children(astNodes: AstNode[]) {
        this.#children = astNodes;
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


    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.#text = text;
    }


    get astFolder(): AstFolder {
        return this.#astFolder;
    }


    set astFolder(astFolder: AstFolder) {
        this.#astFolder = astFolder;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexities of the TreeNodes and the TreeMethods of this TreeFile
     */
    evaluate(): void {
        this.cpxFactors = new CpxFactors();
        // const treeMethodService = new TreeMethodService();
        for (const child of this.#children) {
            child.evaluate();
        }
        // for (const method of this.treeMethods) {
        //     method.evaluate();
        //     this.cpxIndex += method.cpxIndex;
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        // }
    }


    /**
     * Gets the stats of this TreeFile
     */
    // getStats(): Stats {
    // if (!this.stats) {
    //     this.stats = this.astFileService.getStats(this);
    // }
    // return this.stats;
    // }


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
        console.log('children', this.#children);
        console.log('treeFolder', this.#astFolder);
    }


}
