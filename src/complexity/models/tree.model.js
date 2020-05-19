"use strict";
exports.__esModule = true;
var chalk = require('chalk');
/**
 * The formatted tree of elements corresponding to an Abstract Syntax Tree (AST)
 */
var Tree = /** @class */ (function () {
    function Tree() {
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
    Tree.prototype.printAllChildren = function () {
        this.printChildren(this, ' ');
    };
    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    // TODO : implement feature
    Tree.prototype.printChildren = function (tsTree, indent) {
        for (var _i = 0, _a = tsTree.children; _i < _a.length; _i++) {
            var childTree = _a[_i];
            var color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'depth', childTree.depth, 'parent', tsTree.kind);
            var newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    };
    return Tree;
}());
exports.Tree = Tree;
