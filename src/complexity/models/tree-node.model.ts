import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { IsAstNode } from '../interfaces/is-ast-node';
import { Evaluable } from './evaluable.model';
import { NodeFeature } from '../enums/node-feature.enum';
import { Ast } from '../services/ast.service';
import { CpxFactors } from './cpx-factors.model';
import { cpxFactors } from '../cpx-factors';
import { addObjects } from '../services/tools.service';
import { NodeFeatureService } from '../services/node-feature.service';

const chalk = require('chalk');

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable implements IsAstNode {

    children?: TreeNode[] = [];                 // The children trees corresponding to children AST nodes of the current AST node
    #cpxFactors?: CpxFactors = new CpxFactors();
    #feature?: NodeFeature = undefined;
    kind ?= '';                                 // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #nestingCpx: number = undefined;            // The nesting of the node inside a given method
    node?: ts.Node = undefined;                 // The current node in the AST
    nodeFeatureService?: NodeFeatureService = new NodeFeatureService();
    parent?: TreeNode;                          // The tree of the parent of the current node
    treeMethod?: TreeMethod = undefined;        // The method at the root of the current tree (if this tree is inside a method)


    constructor() {
        super();
    }

    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate(): void {
        this.calculateCpxFactors();
    }


    get nestingCpx(): number {
        return this.cpxFactors.totalNesting;
    }


    set nestingCpx(cpx) {
        this.#nestingCpx = cpx;
    }


    get feature(): NodeFeature {
        return this.#feature ?? this.nodeFeatureService.getFeature(this.node);
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors ?? this.nodeFeatureService.getCpxFactors(this.feature);
    }


    calculateCpxFactors(): void {
        // const nodeFeature = Ast.getNodeFeature(this.node);
        this.cpxFactors.basic.node = this.feature === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
        this.calculateNestingCpx();
        switch (this.feature) {
            case NodeFeature.BASIC:
                break;
            case NodeFeature.CONDITIONAL:
                this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
                break;
            case NodeFeature.FUNC:
                this.cpxFactors.structural.func = cpxFactors.structural.func;
                break;
            case NodeFeature.LOOP:
                this.cpxFactors.structural.loop = cpxFactors.structural.loop;
                break;
            case NodeFeature.REGEX:
                this.cpxFactors.structural.regex = cpxFactors.structural.regex;
                break;
        }
    }


    calculateNestingCpx(): void {
        if (this.node && this.parent?.parent?.node && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
    }



    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------   PRINT AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------



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
            let color = '';
            if (childTree.cpxFactors.total < 0.5) {
                color = 'white';
            } else {
                color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
            }
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }

}
