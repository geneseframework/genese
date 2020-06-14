import { AstKind } from '../enums/ast-kind.enum';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../../models/cpx-factor/cpx-factors.model';

export class AstNode implements Evaluate {

    #children?: AstNode[] = [];
    #cpxFactors?: CpxFactors = undefined;
    #cyclomaticCpx ?= 0;
    #end ?= 0;
    #kind?: AstKind = undefined;
    #pos ?= 0;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get children(): AstNode[] {
        return this.#children;
    }


    set children(children: AstNode[]) {
        this.#children = children;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get kind(): AstKind {
        return this.#kind;
    }


    set kind(kind: AstKind) {
        this.#kind = kind;
    }


    get pos(): number {
        return this.#pos;
    }


    set pos(pos: number) {
        this.#pos = pos;
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
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        // }
    }
}
