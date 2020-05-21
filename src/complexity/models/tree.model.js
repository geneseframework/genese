"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
/**
 * The formatted tree of elements corresponding to an Abstract Syntax Tree (AST)
 */
class Tree {
    constructor() {
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        this.depth = 0; // The depth of the node inside a given method
        this.increasesCognitiveComplexity = false; // True if the node's type increases the cognitive complexity
        this.kind = ''; // The kind of the node ('MethodDeclaration, IfStatement, ...)
        this.node = undefined; // The current node in the AST
        this.treeMethod = undefined; // The method at the root of the current tree (if this tree is inside a method)
        // super();
    }
    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    // TODO : implement feature
    printAllChildren() {
        this.printChildren(this, ' ');
    }
    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    // TODO : implement feature
    printChildren(tsTree, indent) {
        for (const childTree of tsTree.children) {
            const color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'depth', childTree.depth, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }
}
exports.Tree = Tree;
