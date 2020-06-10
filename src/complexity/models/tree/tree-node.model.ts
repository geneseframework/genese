import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { HasTreeNode } from '../../interfaces/has-tree-node';
import { Evaluable } from '../evaluable.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { cpxFactors } from '../../cpx-factors';
import { addObjects } from '../../services/tools.service';
import { NodeFeatureService } from '../../services/node-feature.service';
import { Ast } from '../../services/ast.service';
import { ParentFunction } from './parent-function.model';
import { TreeNodeService } from '../../services/tree/tree-node.service';
import { TreeFile } from './tree-file.model';

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable {

    children?: TreeNode[] = [];                                             // The children trees corresponding to children AST nodes of the current AST node
    #context?: TreeNode = undefined;                                        // The context of the TreeNode
    #cpxFactors?: CpxFactors = new CpxFactors();                            // The complexity factors of the TreeNode
    #feature?: NodeFeature = undefined;                                     // The NodeFeature of the node of the TreeNode
    #intrinsicDepthCpx: number = undefined;                                 // The depth of the TreeNode inside its method (not including its parent's depth)
    #intrinsicNestingCpx: number = undefined;                               // The nesting of the TreeNode inside its method (not including its parent's nesting)
    #isNodeContext: boolean = undefined;                                    // The node defines a new context : VariableDeclaration, FunctionExpression, ...
    #kind: string = undefined;                                              // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #name: string = undefined;                                              // The name of the TreeNode
    #nestingCpx: number = undefined;                                        // The nesting of the TreeNode inside its method (including its parent's nesting)
    node?: ts.Node = undefined;                                             // The current node in the AST
    nodeFeatureService?: NodeFeatureService = new NodeFeatureService();     // The service managing NodeFeatures
    parent?: TreeNode;                                                      // The tree of the parent of the current node
    #parentFunction?: ParentFunction = undefined;                           // The first function or method which a parent of the TreeNode
    #treeFile?: TreeFile = undefined;                                       // The TreeFile containing the AST node of the TreeNode
    treeMethod?: TreeMethod = undefined;                                    // The method at the root of the current tree (if this tree is inside a method)
    treeNodeService?: TreeNodeService = new TreeNodeService();              // The service managing NodeFeatures


    constructor() {
        super();
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get aggregationCpx(): number {
        return this.cpxFactors.totalAggregation;
    }


    /**
     * Gets the context of this TreeNode
     */
    get context(): TreeNode {
        return this.#context ?? this.treeNodeService.getNodeContext(this);
    }


    /**
     * Sets the context of this TreeNode
     */
    set context(treeNode: TreeNode) {
        this.#context = treeNode;
    }


    /**
     * Gets the first function or method which is a parent of this TreeNode
     */
    get parentFunction(): ParentFunction {
        return this.#parentFunction ?? this.treeNodeService.setParentFunction(this);
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


    get depthCpx(): number {
        return this.cpxFactors.totalDepth;
    }


    get feature(): NodeFeature {
        return this.#feature ?? this.nodeFeatureService.getFeature(this.node);
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
     * Checks if this TreeNode is a recursion, ie a call to a parameter of its ParentFunction.
     * This TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isCallback(): boolean {
        return this.treeNodeService.isCallback(this);
    }


    get isFunction(): boolean {
        return this.feature === NodeFeature.FUNC;
    }


    get isMethodIdentifier(): boolean {
        return Ast.isMethodIdentifier(this.node);
    }


    /**
     * Checks if this TreeNode defines a new context
     * Examples: VariableDeclaration, FunctionExpression, ...
     */
    get isNodeContext(): boolean {
        return this.#isNodeContext ?? this.treeNodeService.isContext(this);
    }


    /**
     * Sets the value of #isNodeContext
     * @param bool      // The value to set
     */
    set isNodeContext(bool: boolean) {
        this.#isNodeContext = bool;
    }


    get isParam(): boolean {
        return Ast.isParam(this.node);
    }


    /**
     * Checks if this TreeNode is a recursion, ie a call to this ParentFunction.
     * This TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isRecursion(): boolean {
        return this.treeNodeService.isRecursion(this);
    }


    get kind(): string {
        return this.#kind ?? Ast.getType(this.node);
    }


    set kind(kind: string) {
        this.#kind = kind;
    }


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = this.node?.['name']?.['escapedText'] ?? this.node?.['escapedText'] ?? Ast.getType(this.node);
        return this.#name;
    }


    get nestingCpx(): number {
        return this.cpxFactors.totalNesting;
    }


    set nestingCpx(cpx) {
        this.#nestingCpx = cpx;
    }


    get position(): number {
        return Ast.getPosition(this.node);
    }


    get sourceFile(): ts.SourceFile {
        return this.#treeFile?.sourceFile;
    }


    get treeFile(): TreeFile {
        return this.#treeFile;
    }


    set treeFile(treeFile: TreeFile) {
        this.#treeFile = treeFile;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Mandatory method for HasTreeNode interface
     */
    evaluate(): void {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
    }


    calculateAndSetCpxFactors(): CpxFactors {
        this.setGeneralCaseCpxFactors();
        this.setBasicCpxFactors();
        this.setRecursionOrCallbackCpxFactors();
        this.setElseCpxFactors();
        this.setRegexCpxFactors();
        this.setDepthCpxFactors();
        this.setAggregationCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        return this.#cpxFactors;
    }


    private setGeneralCaseCpxFactors(): void{
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


    private setRecursionOrCallbackCpxFactors(): void {
        this.cpxFactors.structural.recursion = this.isRecursion ? cpxFactors.structural.recursion : 0;
        this.cpxFactors.structural.callback = this.isCallback ? cpxFactors.structural.callback : 0;
    }


    private setRegexCpxFactors(): void {
        if (this.feature === NodeFeature.REGEX) {
            this.cpxFactors.aggregation.regex = +((this.node['text'].length - 2) * cpxFactors.aggregation.regex).toFixed(2);
        }
    }


    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    private addParentCpx(): void {
        if (this.node && this.parent?.node && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this.node && this.parent?.parent?.node && this.parent?.cpxFactors?.depth) {
            this.cpxFactors.depth = addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }

}
