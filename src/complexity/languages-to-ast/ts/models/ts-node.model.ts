import * as ts from 'typescript';
import { Ts } from '../services/ts.service';

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TsNode (AST)
 */
export class TsNode {

    children?: TsNode[] = [];                                                 // The children trees corresponding to children AST nodes of the current AST node
    #end: number = undefined;
    #kind: string = undefined;                                                  // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #name: string = undefined;                                                  // The name of the TsNode
    #node?: ts.Node = undefined;                                                // The current node in the AST
    #parent?: TsNode;                                                         // The tree of the parent of the current node
    #pos?: number = undefined;


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get kind(): string {
        return this.#kind ?? Ts.getKind(this.node);
    }


    set kind(kind: string) {
        this.#kind = kind;
    }


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = this.node?.['name']?.['escapedText'] ?? this.node?.['escapedText'] ?? '';
        return this.#name;
    }


    get node(): ts.Node {
        return this.#node;
    }


    set node(node: ts.Node) {
        this.#node = node;
    }


    get parent(): TsNode {
        return this.#parent;
    }


    set parent(treeNode: TsNode) {
        this.#parent = treeNode;
    }


    get pos(): number {
        return this.#pos;
    }


    set pos(position: number) {
        this.#pos = position;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


}
