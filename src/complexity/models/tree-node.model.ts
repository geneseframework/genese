import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Evaluable } from './evaluable.model';

const chalk = require('chalk');

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable implements IsAstNode {

    children?: TreeNode[] = [];                 // The children trees corresponding to children AST nodes of the current AST node
    increasesCognitiveComplexity = false;       // True if the node's type increases the cognitive complexity
    kind ?= '';                                 // The kind of the node ('MethodDeclaration, IfStatement, ...)
    nesting ?= 0;                               // The nesting of the node inside a given method
    node?: ts.Node = undefined;                 // The current node in the AST
    parent?: TreeNode;                          // The tree of the parent of the current node
    treeMethod?: TreeMethod = undefined;        // The method at the root of the current tree (if this tree is inside a method)


    constructor() {
        super();
    }

    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate(): void {
    }

    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    printAllChildren(){
        this.printChildren(this, ' ');
    }


    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    printChildren(tsTree: TreeNode, indent: string) {
        for (const childTree of tsTree.children) {
            const color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nesting, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }

}
