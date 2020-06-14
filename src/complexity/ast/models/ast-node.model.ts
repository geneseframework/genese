import { AstKind } from '../enums/ast-kind.enum';

export class AstNode {

    #children?: AstNode[] = [];
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
}
