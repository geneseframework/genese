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

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable implements IsAstNode {

    children?: TreeNode[] = [];                                             // The children trees corresponding to children AST nodes of the current AST node
     #cpxFactors?: CpxFactors = new CpxFactors();                            // The complexity factors of the TreeNode
    #feature?: NodeFeature = undefined;                                     // The NodeFeature of the node of the TreeNode
    #intrinsicDepthCpx: number = undefined;                                 // The depth of the TreeNode inside its method (not including its parent's depth)
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
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
    }


    get depthCpx(): number {
        return this.cpxFactors.totalDepth;
    }


    get aggregationCpx(): number {
        return this.cpxFactors.totalAggregation;
    }


    get nestingCpx(): number {
        return this.cpxFactors.totalNesting;
    }


    set nestingCpx(cpx) {
        this.#nestingCpx = cpx;
    }


    /**
     * Gets the nesting complexity of the node itself, not from its parents
     */
    get intrinsicNestingCpx(): number {
        return this.#intrinsicNestingCpx;
    }


    /**
     * Sets the nesting complexity of the node itself, not from its parents
     */
    set intrinsicNestingCpx(cpx: number) {
        this.#intrinsicNestingCpx = cpx;
    }


    /**
     * Gets the depth complexity of the node itself, not from its parents
     */
    get intrinsicDepthCpx(): number {
        return this.#intrinsicDepthCpx;
    }


    /**
     * Sets the depth complexity of the node itself, not from its parents
     */
    set intrinsicDepthCpx(cpx: number) {
        this.#intrinsicDepthCpx = cpx;
    }


    /**
     * Gets the global nesting complexity of the node, including the nesting cpx of its parents
     */
    get cpxFactors(): CpxFactors {
        return this.#cpxFactors ?? this.calculateAndSetCpxFactors();
    }


    set cpxFactors(cpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get feature(): NodeFeature {
        return this.#feature ?? this.nodeFeatureService.getFeature(this.node);
    }


    get name(): string {
        return this.node?.['name']?.['escapedText'] ?? '';
    }


    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The current TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isRecursion(): boolean {
        if (!this.treeMethod) {
            return false;
        }
        return this.name === this.treeMethod.name;
    }


    get isFunction(): boolean {
        return this.feature === NodeFeature.FUNC;
    }


    get params(): string[] {
        if (!this.isFunction) {
            return undefined;
        }
        return this.children.filter(c => Ast.isParam(c.node)).map(e => e.name);
    }


    calculateAndSetCpxFactors(): CpxFactors {
        if (this.params) {
            console.log('PARAMS', this.name, this.params);
        }
        this.setGeneralCaseCpxFactors();
        this.setBasicCpxFactors();
        this.setRecursionCpxFactors();
        this.setElseCpxFactors();
        this.setDepthCpxFactors();
        this.setAggregationCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        return this.#cpxFactors;
    }


    private setGeneralCaseCpxFactors(): void {
        this.cpxFactors.nesting[this.feature] = cpxFactors.nesting[this.feature];
        this.cpxFactors.structural[this.feature] = cpxFactors.structural[this.feature];
    }


    private setBasicCpxFactors(): void {
        this.cpxFactors.basic.node = this.feature === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
    }


    // TODO : refacto when depths different than arrays will be discovered
    private setDepthCpxFactors(): void {
        if (Ast.isArrayIndex(this.node)) {
            this.cpxFactors.depth.arr = cpxFactors.depth.arr;
        }
    }


    private setAggregationCpxFactors(): void {
        if (Ast.isArrayOfArray(this.node)) {
            this.cpxFactors.aggregation.arr = cpxFactors.aggregation.arr;
        } else if (Ast.isDifferentLogicDoor(this.node)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpxFactors.aggregation.differentLogicDoor;
        }
    }


    private setElseCpxFactors(): void {
        if (Ast.isElseStatement(this.node)) {
            this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
        }
        if (Ast.isElseIfStatement(this.node)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    }


    private setRecursionCpxFactors(): void {
        this.cpxFactors.structural.recursion = this.isRecursion ? cpxFactors.structural.recursion : 0;
    }


    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    private addParentCpx(): void {
        if (this.node && this.parent?.parent?.node && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this.node && this.parent?.parent?.node && this.parent?.cpxFactors?.depth) {
            this.cpxFactors.depth = addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }

}
