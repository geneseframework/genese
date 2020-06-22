import * as ts from 'typescript';

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TsNode (AST)
 */
export class TsNode {

    end: number = undefined;                        // The position of the end of the source code of the TsNode in the code of its TsFile : will be injected as is in the JsonAst file
    kind: string = undefined;                       // The kind of the TsNode ('MethodDeclaration, IfStatement, ...) : will be injected as is in the JsonAst file
    name: string = undefined;                       // The name of the TsNode : will be injected as is in the JsonAst file
    #node?: ts.Node = undefined;                    // The Typescript AST node of the TsNode
    #parent?: TsNode;                               // The TsNode of the parent of the TsNode
    pos?: number = undefined;                       // The position of the beginning of the source code of the TsNode in the code of its TsFile : will be injected as is in the JsonAst file
    children?: TsNode[] = [];                       // The children trees corresponding to children AST nodes of the current AST node : will be used to create the children of the AstNodes in the JsonAst file


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



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

}