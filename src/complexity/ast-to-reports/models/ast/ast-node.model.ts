import { SyntaxKind } from '../../../core/enum/syntax-kind.enum';
import { AstFile } from './ast-file.model';
import { AstMethod } from './ast-method.model';
import { Ast } from '../../services/ast/ast.service';
import { NodeFeatureService } from '../../services/factor-category.service';
import { Evaluate } from '../../interfaces/evaluate.interface';
import { CpxFactors } from '../cpx-factor/cpx-factors.model';
import { NodeFeature } from '../../enums/node-feature.enum';
import { cpxFactors } from '../../../cpx-factors';
import { addObjects } from '../../../core/services/tools.service';
import { AstNodeService } from '../../services/ast/ast-node.service';
import * as chalk from 'chalk';
import { Logg } from '../../../core/interfaces/logg.interface';

export class AstNode implements Evaluate, Logg {

    #astFile?: AstFile = undefined;                                             // The AstFile containing the AST node of the AstNode
    #astMethod?: AstMethod = undefined;                                         // The method at the root of the current ast (if this ast is inside a method)
    astNodeService?: AstNodeService = new AstNodeService();                                                       // The service managing AstNodes
    #children?: AstNode[] = [];
    #context?: AstNode = undefined;                                             // The context of the AstNode
    #cpxFactors?: CpxFactors = undefined;                                       // The complexity factors of the AstNode
    #cyclomaticCpx ?= 0;
    #end ?= 0;
    #factorCategory?: NodeFeature = undefined;                                  // The NodeFeature of the node of the AstNode
    nodeFeatureService?: NodeFeatureService = new NodeFeatureService();         // The service managing NodeFeatures
    #intrinsicDepthCpx: number = undefined;                                     // The depth of the AstNode inside its method (not including its parent's depth)
    #intrinsicNestingCpx: number = undefined;                                   // The nesting of the AstNode inside its method (not including its parent's nesting)
    #isCallback: boolean = undefined;                                           // True if the astNode is a method with a Callback, false if not
    #isRecursiveMethod: boolean = undefined;                                    // True if the astNode is a recursive method, false if not
    #kind?: SyntaxKind = undefined;                                             // The kind of the node ('MethodDeclaration, IfStatement, ...)
    #name: string = undefined;                                                  // The name of the AstNode
    #parent?: AstNode;                                                          // The ast of the parent of the current node
    #pos ?= 0;
    #text: string = undefined;



    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------



    get aggregationCpx(): number {
        return this.cpxFactors?.totalAggregation;
    }


    get astFile(): AstFile {
        return this.#astFile;
    }


    set astFile(astFile: AstFile) {
        this.#astFile = astFile;
    }


    get astMethod(): AstMethod {
        return this.#astMethod;
    }


    set astMethod(astMethod: AstMethod) {
        this.#astMethod = astMethod;
    }


    get children(): AstNode[] {
        return this.#children;
    }


    set children(children: AstNode[]) {
        this.#children = children;
    }


    get context(): AstNode {
        return this.#context ?? this.astNodeService.getContext(this);
    }


    set context(treeNode: AstNode) {
        this.#context = treeNode;
    }


    get cpxFactors(): CpxFactors {
        return this.#cpxFactors;
    }


    set cpxFactors(cpxFactors: CpxFactors) {
        this.#cpxFactors = cpxFactors;
    }


    get cyclomaticCpx(): number {
        return this.#cyclomaticCpx;
    }


    set cyclomaticCpx(cyclomaticCpx: number) {
        this.#cyclomaticCpx = cyclomaticCpx;
    }


    get depthCpx(): number {
        return this.cpxFactors?.totalDepth;
    }


    get end(): number {
        return this.#end;
    }


    set end(end: number) {
        this.#end = end;
    }


    get factorCategory(): NodeFeature {
        return this.#factorCategory ?? this.nodeFeatureService.getNodeFeature(this.kind);
    }


    get firstSon(): AstNode {
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
        if (this.#isCallback) {
            return this.#isCallback;
        }
        this.#isCallback = this.astNodeService.isCallback(this);
        return this.#isCallback;
    }


    get isCallIdentifier(): boolean {
        return Ast.isCallIdentifier(this) && this === this.parent.firstSon;
    }


    get isFunctionOrMethodDeclaration(): boolean {
        return this.factorCategory === NodeFeature.DECLARATION;
    }


    get isParam(): boolean {
        return Ast.isParam(this);
    }


    get isRecursiveMethod(): boolean {
        if (this.#isRecursiveMethod) {
            return this.#isRecursiveMethod;
        }
        this.#isRecursiveMethod = this.astNodeService.isRecursiveMethod(this);
        return this.#isRecursiveMethod;
    }


    get kind(): SyntaxKind {
        return this.#kind;
    }


    set kind(kind: SyntaxKind) {
        this.#kind = kind;
    }


    get mayDefineContext(): boolean {
        return Ast.mayDefineContext(this);
    }


    get name(): string {
        return this.#name ?? '';
    }


    set name(name: string) {
        this.#name = name;
    }


    get nestingCpx(): number {
        return this.cpxFactors?.totalNesting;
    }


    get parent(): AstNode {
        return this.#parent;
    }


    set parent(treeNode: AstNode) {
        this.#parent = treeNode;
    }


    get recursionCpx(): number {
        return this.cpxFactors?.totalRecursion;
    }


    get secondSon(): AstNode {
        return this.getSon(1);
    }


    get structuralCpx(): number {
        return this.cpxFactors?.totalStructural;
    }


    get pos(): number {
        return this.#pos;
    }


    set pos(pos: number) {
        this.#pos = pos;
    }


    get text(): string {
        return this.#text ?? this.astNodeService.getCode(this);
    }


    set text(text: string) {
        this.#text = text;
    }


    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------


    /**
     * Evaluates the complexities of the AstNodes and the AstMethods of this AstFile
     */
    evaluate(): void {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
        for (const child of this.#children) {
            child.evaluate();
        }
    }

    /**
     * Gets the xth son of this AstNode
     * @param sonNumber
     */
    getSon(sonNumber: number): AstNode {
        return this.children[sonNumber];
    }


    /**
     * Calculates the complexity factors of the AstNode
     */
    calculateAndSetCpxFactors(): CpxFactors {
        this.cpxFactors = new CpxFactors();
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
        if (Ast.isArrayIndex(this)) {
            this.cpxFactors.depth.arr = cpxFactors.depth.arr;
        }
    }


    /**
     * Sets aggregation complexity factor
     */
    private setAggregationCpxFactors(): void {
        if (Ast.isArrayOfArray(this)) {
            this.cpxFactors.aggregation.arr = cpxFactors.aggregation.arr;
        } else if (Ast.isDifferentLogicDoor(this)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpxFactors.aggregation.differentLogicDoor;
        }
    }


    /**
     * Sets complexity factor for "else" case
     */
    private setElseCpxFactors(): void {
        if (Ast.isElseStatement(this)) {
            this.cpxFactors.structural.conditional = cpxFactors.structural.conditional;
        }
        if (Ast.isElseIfStatement(this)) {
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
            this.cpxFactors.aggregation.regex = +((this['text'].length - 2) * cpxFactors.aggregation.regex).toFixed(2);
        }
    }


    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    private addParentCpx(): void {
        if (this && this.parent && this.parent?.cpxFactors?.nesting) {
            this.cpxFactors.nesting = addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this && this.parent?.parent && this.parent?.cpxFactors?.depth) {
            this.cpxFactors.depth = addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }



    logg(message?: string): void {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message ?? 'AST NODE'));
        console.log(this.kind, this.name);
        console.log('-----------------------------');
        console.log('pos', this.pos, 'end', this.end);
        console.log('text', this.text);
    }


}
