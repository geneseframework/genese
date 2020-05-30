import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Evaluable } from './evaluable.model';
import { NodeFeature } from '../enums/node-feature.enum';
import { Ast } from '../services/ast.service';
import { NestingService } from '../services/nesting.service';

const chalk = require('chalk');

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable implements IsAstNode {

    children?: TreeNode[] = [];                 // The children trees corresponding to children AST nodes of the current AST node
    increasesCognitiveComplexity = false;       // True if the node's type increases the cognitive complexity
    kind ?= '';                                 // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #nestingCpx ?= 0;                               // The nesting of the node inside a given method
    nestingService?: NestingService = new NestingService();
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


    get nodeFeature(): NodeFeature {
        return Ast.getNodeFeature(this.node);
    }


    get aggregationCpx(): number {
        return Ast.getAggregationCpx(this.nodeFeature);
    }


    get nestingCpx(): number {
        return this.#nestingCpx ?? this.calculateNestingCpx();
    }


    set nestingCpx(cpx) {
        this.#nestingCpx = cpx;
    }

    calculateNestingCpx() {
        if (!this.node || !this.parent) {
            return 0;
        }
        let nesting = this.parent.nestingCpx ?? 0;
        nesting += Ast.getNestingCpx(Ast.getNodeFeature(this.parent.node));
        console.log('NODE', Ast.getType(this.node), 'NESTING', nesting);
        return nesting;
    }


    get structuralCpx(): number {
        return Ast.getStructuralCpx(this.nodeFeature);
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
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }

}
