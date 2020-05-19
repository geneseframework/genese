import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { IsAstNode } from '../interfaces/is-ast-node';

const chalk = require('chalk');

/**
 * The formatted tree of elements corresponding to an Abstract Syntax Tree (AST)
 */
export class Tree implements IsAstNode {

    children?: Tree[] = [];                 // The children trees corresponding to children AST nodes of the current AST node
    depth ?= 0;                             // The depth of the node inside a given method
    increasesCognitiveComplexity = false;   // True if the node's type increases the cognitive complexity
    kind ?= '';                             // The kind of the node ('MethodDeclaration, IfStatement, ...)
    node?: ts.Node = undefined;             // The current node in the AST
    parent?: Tree;                          // The tree of the parent of the current node
    treeMethod?: TreeMethod = undefined;    // The method at the root of the current tree (if this tree is inside a method)


    constructor() {
        // super();
    }

    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    // TODO : implement feature
    printAllChildren(){
        this.printChildren(this, ' ');
    }


    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    // TODO : implement feature
    printChildren(tsTree: Tree, indent: string) {
        for (const childTree of tsTree.children) {
            const color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'depth', childTree.depth, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }

}
