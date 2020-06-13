import { AstNode } from './ast-node.model';

export class AstFile {

    #children: AstNode[] = [];
    #end ?= 0;
    #path ?= '';
    #text ?= '';



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get children(): AstNode[] {
        return this.#children;
    }


    set children(astNodes: AstNode[]) {
        this.children = astNodes;
    }


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.end = end;
    }


    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.path = path;
    }


    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.text = text;
    }

}
