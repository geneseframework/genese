import { AstNode } from './ast-node.model';
import { AstKind } from '../enums/ast-kind.enum';

export class AstFile {

    #children: AstNode[] = [];
    #end ?= 0;
    #path ?= '';
    #text ?= '';



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


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


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get path(): string {
        return this.#path;
    }


    set path(path: string) {
        this.#path = path;
    }


    get text(): string {
        return this.#text;
    }


    set text(text: string) {
        this.#text = text;
    }

}
