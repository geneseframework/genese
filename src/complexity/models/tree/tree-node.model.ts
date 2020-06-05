import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { IsAstNode } from '../../interfaces/is-ast-node';
import { Evaluable } from '../evaluable.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { cpxFactors } from '../../cpx-factors';
import { addObjects } from '../../services/tools.service';
import { NodeFeatureService } from '../../services/node-feature.service';
import { Ast } from '../../services/ast.service';

const chalk = require('chalk');

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable implements IsAstNode {

    children?: TreeNode[] = [];                                             // The children trees corresponding to children AST nodes of the current AST node
    #cpxFactors?: CpxFactors = new CpxFactors();                            // The complexity factors of the TreeNode
    #feature?: NodeFeature = undefined;                                     // The NodeFeature of the node of the TreeNode
    #intrinsicNestingCpx: number = undefined;                               // The nesting of the TreeNode inside its method (not including its parent's nesting)
    kind ?= '';                                                             // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #nestingCpx: number = undefined;                                        // The nesting of the TreeNode inside its method (including its parent's nesting)
    node?: ts.Node = undefined;                                             // The current node in the AST
    nodeFeatureService?: NodeFeatureService = new NodeFeatureService();     // The service managing NodeFeatures
    parent?: TreeNode;                                                      // The tree of the parent of the current node
    treeMethod?: TreeMethod = undefined;                                    // The method at the root of the current tree (if this tree is inside a method)


    constructor() {
        super();
    }

    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate(): void {
        this.calculateCpxFactors();
        this.addParentNestingCpx();
    }


    get nestingCpx(): number {
        return this.cpxFactors.totalNesting;
    }


    set nestingCpx(cpx) {
        this.#nestingCpx = cpx;
    }


    /**
     * Gets the complexity of the node itself, not from its parents
     */
    get intrinsicNestingCpx(): number {
        return this.#intrinsicNestingCpx;
    }


    set intrinsicNestingCpx(cpx: number) {
        this.#intrinsicNestingCpx = cpx;
    }


    /**
     * Gets the global nesting complexity of the node, including the nesting cpx of its parents
     */
    get cpxFactors(): CpxFactors {
        return this.#cpxFactors ?? this.calculateCpxFactors();
    }


    set cpxFactors(cpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get feature(): NodeFeature {
        return this.#feature ?? this.nodeFeatureService.getFeature(this.node);
    }


    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The current TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    isRecursion(): boolean {
        if (!this.treeMethod) {
            return false;
        }
        return this.node?.['name']?.['escapedText'] === this.treeMethod.name;
    }


    calculateCpxFactors(): CpxFactors {
        this.cpxFactors.basic.node = this.feature === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
        if (this.isRecursion()) {
            this.cpxFactors.structural.recursion = cpxFactors.structural.recursion;
        }
        if (Ast.isElseStatement(this.node)) {
            this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
        }
        switch (this.feature) {
            case NodeFeature.BASIC:
                break;
            case NodeFeature.BINARY:
                this.addBinaryCpxFactors();
                break;
            case NodeFeature.CONDITIONAL:
                this.cpxFactors.nesting.conditional = Ast.isElseIfStatement(this.node) ? 0 : cpxFactors.nesting.conditional;
                this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
                break;
            case NodeFeature.FUNC:
                this.cpxFactors.structural.func = cpxFactors.structural.func;
                break;
            case NodeFeature.LOGIC_DOOR:
                this.cpxFactors.structural.logicDoor = cpxFactors.structural.logicDoor;
                break;
            case NodeFeature.REGEX:
                this.cpxFactors.structural.regex = cpxFactors.structural.regex;
                break;
            case NodeFeature.TERNARY:
                this.cpxFactors.nesting.ternary = cpxFactors.nesting.ternary;
                this.cpxFactors.structural.ternary = cpxFactors.structural.ternary;
                break;
        }
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        return this.#cpxFactors;
    }


    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    private addParentNestingCpx(): void {
        if (this.node && this.parent?.parent?.node && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
    }


    private addBinaryCpxFactors(): void {
        this.cpxFactors = this.cpxFactors.add(this.nodeFeatureService.getBinaryCpxFactors(this));
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
