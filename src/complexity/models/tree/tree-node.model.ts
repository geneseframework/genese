import * as ts from 'typescript';
import { TreeMethod } from './tree-method.model';
import { Evaluable } from '../evaluable.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { cpxFactors } from '../../cpx-factors';
import { addObjects } from '../../services/tools.service';
import { FactorCategoryService } from '../../services/factor-category.service';
import { Ast } from '../../services/ast.service';
import { TreeNodeService } from '../../services/tree/tree-node.service';
import { TreeFile } from './tree-file.model';

/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
export class TreeNode extends Evaluable {

    children?: TreeNode[] = [];                                                 // The children trees corresponding to children AST nodes of the current AST node
    #context?: TreeNode = undefined;                                            // The context of the TreeNode
    #cpxFactors?: CpxFactors = new CpxFactors();                                // The complexity factors of the TreeNode
    #factorCategory?: NodeFeature = undefined;                               // The NodeFeature of the node of the TreeNode
    #intrinsicDepthCpx: number = undefined;                                     // The depth of the TreeNode inside its method (not including its parent's depth)
    #intrinsicNestingCpx: number = undefined;                                   // The nesting of the TreeNode inside its method (not including its parent's nesting)
    #kind: string = undefined;                                                  // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #name: string = undefined;                                                  // The name of the TreeNode
    #node?: ts.Node = undefined;                                                // The current node in the AST
    nodeFeatureService?: FactorCategoryService = new FactorCategoryService();   // The service managing NodeFeatures
    #parent?: TreeNode;                                                         // The tree of the parent of the current node
    #treeFile?: TreeFile = undefined;                                           // The TreeFile containing the AST node of the TreeNode
    #treeMethod?: TreeMethod = undefined;                                       // The method at the root of the current tree (if this tree is inside a method)
    treeNodeService?: TreeNodeService = new TreeNodeService();                  // The service managing NodeFeatures


    constructor() {
        super();
    }


    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get aggregationCpx(): number {
        return this.cpxFactors.totalAggregation;
    }


    get context(): TreeNode {
        return this.#context ?? this.treeNodeService.getContext(this);
    }


    set context(treeNode: TreeNode) {
        this.#context = treeNode;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors ?? this.calculateAndSetCpxFactors();
    }


    set cpxFactors(cpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get depthCpx(): number {
        return this.cpxFactors.totalDepth;
    }


    get factorCategory(): NodeFeature {
        return this.#factorCategory ?? this.nodeFeatureService.getFactorCategory(this.node);
    }


    get firstSon(): TreeNode {
        return this.getSon(0);
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


    get isCallback(): boolean {
        return this.treeNodeService.isCallback(this);
    }


    get isCallIdentifier(): boolean {
        return Ast.isCallIdentifier(this.node) && this === this.parent.firstSon;
    }


    get isFunctionOrMethodDeclaration(): boolean {
        return this.factorCategory === NodeFeature.DECLARATION;
    }


    get isParam(): boolean {
        return Ast.isParam(this.node);
    }


    get isRecursiveMethod(): boolean {
        return this.treeNodeService.isRecursiveMethod(this);
    }


    get kind(): string {
        return this.#kind ?? Ast.getKind(this.node);
    }


    set kind(kind: string) {
        this.#kind = kind;
    }


    get mayDefineContext(): boolean {
        return Ast.mayDefineContext(this.node);
    }


    get name(): string {
        if (this.#name) {
            return this.#name;
        }
        this.#name = this.node?.['name']?.['escapedText'] ?? this.node?.['escapedText'] ?? Ast.getKind(this.node);
        return this.#name;
    }


    get nestingCpx(): number {
        return this.cpxFactors.totalNesting;
    }


    get node(): ts.Node {
        return this.#node;
    }


    set node(node: ts.Node) {
        this.#node = node;
    }


    get parent(): TreeNode {
        return this.#parent;
    }


    set parent(treeNode: TreeNode) {
        this.#parent = treeNode;
    }


    get position(): number {
        return Ast.getPosition(this.node);
    }


    get recursionCpx(): number {
        return this.cpxFactors.totalRecursion;
    }


    get secondSon(): TreeNode {
        return this.getSon(1);
    }


    get sourceFile(): ts.SourceFile {
        return this.#treeFile?.sourceFile;
    }


    get structuralCpx(): number {
        return this.cpxFactors.totalStructural;
    }


    get treeFile(): TreeFile {
        return this.#treeFile;
    }


    set treeFile(treeFile: TreeFile) {
        this.#treeFile = treeFile;
    }


    get treeMethod(): TreeMethod {
        return this.#treeMethod;
    }


    set treeMethod(treeMethod: TreeMethod) {
        this.#treeMethod = treeMethod;
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


    /**
     * Gets the xth son of this TreeNode
     * @param sonNumber
     */
    getSon(sonNumber: number): TreeNode {
        return this.children[sonNumber];
    }


    /**
     * Calculates the complexity index of the TreeNode
     */
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


    /**
     * Sets the nesting and structural complexities for "usual" cases
     */
    private setGeneralCaseCpxFactors(): void{
        this.cpxFactors.nesting[this.factorCategory] = cpxFactors.nesting[this.factorCategory];
        this.cpxFactors.structural[this.factorCategory] = cpxFactors.structural[this.factorCategory];
    }


    /**
     * Sets the complexity index corresponding to "basic" factor (ie basic weight for all the AST nodes)
     */
    private setBasicCpxFactors(): void {
        this.cpxFactors.basic.node = this.factorCategory === NodeFeature.EMPTY ? 0 : cpxFactors.basic.node;
    }


    /**
     * Sets depth complexity factor
     * Example : array in array, like a[b[c]]
     */
    private setDepthCpxFactors(): void {
        if (Ast.isArrayIndex(this.node)) {
            this.cpxFactors.depth.arr = cpxFactors.depth.arr;
        }
    }


    /**
     * Sets aggregation complexity factor
     */
    private setAggregationCpxFactors(): void {
        if (Ast.isArrayOfArray(this.node)) {
            this.cpxFactors.aggregation.arr = cpxFactors.aggregation.arr;
        } else if (Ast.isDifferentLogicDoor(this.node)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpxFactors.aggregation.differentLogicDoor;
        }
    }


    /**
     * Sets complexity factor for "else" case
     */
    private setElseCpxFactors(): void {
        if (Ast.isElseStatement(this.node)) {
            this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
        }
        if (Ast.isElseIfStatement(this.node)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    }


    /**
     * Sets complexity factor for callbacks and recursions
     */
    private setRecursionOrCallbackCpxFactors(): void {
        this.cpxFactors.recursion.recursivity = this.isRecursiveMethod ? cpxFactors.recursion.recursivity : 0;
        this.cpxFactors.recursion.callback = this.isCallback ? cpxFactors.recursion.callback : 0;
    }


    /**
     * Sets complexity factor for regex
     */
    private setRegexCpxFactors(): void {
        if (this.factorCategory === NodeFeature.REGEX) {
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
