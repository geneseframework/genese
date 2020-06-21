"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _astFile, _astMethod, _astNodeService, _children, _context, _cpxFactors, _cyclomaticCpx, _end, _factorCategory, _intrinsicDepthCpx, _intrinsicNestingCpx, _isCallback, _isRecursiveMethod, _kind, _name, _parent, _pos, _text;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstNode = void 0;
const ast_service_1 = require("../../services/ast/ast.service");
const factor_category_service_1 = require("../../services/factor-category.service");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const node_feature_enum_1 = require("../../enums/node-feature.enum");
const cpx_factors_1 = require("../../../cpx-factors");
const tools_service_1 = require("../../../core/services/tools.service");
const ast_node_service_1 = require("../../services/ast/ast-node.service");
const chalk = require("chalk");
class AstNode {
    constructor() {
        _astFile.set(this, undefined); // The AstFile containing the AST node of the AstNode
        _astMethod.set(this, undefined); // The method at the root of the current ast (if this ast is inside a method)
        _astNodeService.set(this, new ast_node_service_1.AstNodeService()); // The service managing AstNodes
        _children.set(this, []);
        _context.set(this, undefined); // The context of the AstNode
        _cpxFactors.set(this, undefined); // The complexity factors of the AstNode
        _cyclomaticCpx.set(this, 0);
        _end.set(this, 0);
        _factorCategory.set(this, undefined); // The NodeFeature of the node of the AstNode
        this.nodeFeatureService = new factor_category_service_1.NodeFeatureService(); // The service managing NodeFeatures
        _intrinsicDepthCpx.set(this, undefined); // The depth of the AstNode inside its method (not including its parent's depth)
        _intrinsicNestingCpx.set(this, undefined); // The nesting of the AstNode inside its method (not including its parent's nesting)
        _isCallback.set(this, undefined); // True if the astNode is a method with a Callback, false if not
        _isRecursiveMethod.set(this, undefined); // True if the astNode is a recursive method, false if not
        _kind.set(this, undefined); // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _name.set(this, undefined); // The name of the AstNode
        _parent.set(this, void 0); // The ast of the parent of the current node
        _pos.set(this, 0);
        _text.set(this, undefined);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get aggregationCpx() {
        var _a;
        return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalAggregation;
    }
    get astFile() {
        return __classPrivateFieldGet(this, _astFile);
    }
    set astFile(astFile) {
        __classPrivateFieldSet(this, _astFile, astFile);
    }
    get astMethod() {
        return __classPrivateFieldGet(this, _astMethod);
    }
    set astMethod(astMethod) {
        __classPrivateFieldSet(this, _astMethod, astMethod);
    }
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(children) {
        __classPrivateFieldSet(this, _children, children);
    }
    get context() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _context)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astNodeService).getContext(this);
    }
    set context(treeNode) {
        __classPrivateFieldSet(this, _context, treeNode);
    }
    get cpxFactors() {
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get cyclomaticCpx() {
        return __classPrivateFieldGet(this, _cyclomaticCpx);
    }
    set cyclomaticCpx(cyclomaticCpx) {
        __classPrivateFieldSet(this, _cyclomaticCpx, cyclomaticCpx);
    }
    get depthCpx() {
        var _a;
        return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalDepth;
    }
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get factorCategory() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _factorCategory)) !== null && _a !== void 0 ? _a : this.nodeFeatureService.getNodeFeature(this.kind);
    }
    get firstSon() {
        return this.getSon(0);
    }
    /**
     * Gets the depth complexity of the node itself, not from its parents
     */
    get intrinsicDepthCpx() {
        return __classPrivateFieldGet(this, _intrinsicDepthCpx);
    }
    /**
     * Sets the depth complexity of the node itself, not from its parents
     */
    set intrinsicDepthCpx(cpx) {
        __classPrivateFieldSet(this, _intrinsicDepthCpx, cpx);
    }
    /**
     * Gets the nesting complexity of the node itself, not from its parents
     */
    get intrinsicNestingCpx() {
        return __classPrivateFieldGet(this, _intrinsicNestingCpx);
    }
    /**
     * Sets the nesting complexity of the node itself, not from its parents
     */
    set intrinsicNestingCpx(cpx) {
        __classPrivateFieldSet(this, _intrinsicNestingCpx, cpx);
    }
    get isCallback() {
        if (__classPrivateFieldGet(this, _isCallback)) {
            return __classPrivateFieldGet(this, _isCallback);
        }
        __classPrivateFieldSet(this, _isCallback, __classPrivateFieldGet(this, _astNodeService).isCallback(this));
        return __classPrivateFieldGet(this, _isCallback);
    }
    get isCallIdentifier() {
        return ast_service_1.Ast.isCallIdentifier(this) && this === this.parent.firstSon;
    }
    get isFunctionOrMethodDeclaration() {
        return this.factorCategory === node_feature_enum_1.NodeFeature.DECLARATION;
    }
    get isParam() {
        return ast_service_1.Ast.isParam(this);
    }
    get isRecursiveMethod() {
        if (__classPrivateFieldGet(this, _isRecursiveMethod)) {
            return __classPrivateFieldGet(this, _isRecursiveMethod);
        }
        __classPrivateFieldSet(this, _isRecursiveMethod, __classPrivateFieldGet(this, _astNodeService).isRecursiveMethod(this));
        return __classPrivateFieldGet(this, _isRecursiveMethod);
    }
    get kind() {
        return __classPrivateFieldGet(this, _kind);
    }
    set kind(kind) {
        __classPrivateFieldSet(this, _kind, kind);
    }
    get mayDefineContext() {
        return ast_service_1.Ast.mayDefineContext(this);
    }
    get name() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _name)) !== null && _a !== void 0 ? _a : '';
    }
    set name(name) {
        __classPrivateFieldSet(this, _name, name);
    }
    get nestingCpx() {
        var _a;
        return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalNesting;
    }
    get parent() {
        return __classPrivateFieldGet(this, _parent);
    }
    set parent(treeNode) {
        __classPrivateFieldSet(this, _parent, treeNode);
    }
    get recursionCpx() {
        var _a;
        return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalRecursion;
    }
    get secondSon() {
        return this.getSon(1);
    }
    get structuralCpx() {
        var _a;
        return (_a = this.cpxFactors) === null || _a === void 0 ? void 0 : _a.totalStructural;
    }
    get pos() {
        return __classPrivateFieldGet(this, _pos);
    }
    set pos(pos) {
        __classPrivateFieldSet(this, _pos, pos);
    }
    get text() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _text)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astNodeService).getCode(this);
    }
    set text(text) {
        __classPrivateFieldSet(this, _text, text);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of the AstNodes and the AstMethods of this AstFile
     */
    evaluate() {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
        for (const child of __classPrivateFieldGet(this, _children)) {
            child.evaluate();
        }
    }
    /**
     * Gets the xth son of this AstNode
     * @param sonNumber
     */
    getSon(sonNumber) {
        return this.children[sonNumber];
    }
    /**
     * Calculates the complexity factors of the AstNode
     */
    calculateAndSetCpxFactors() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        this.setGeneralCaseCpxFactors();
        this.setBasicCpxFactors();
        this.setRecursionOrCallbackCpxFactors();
        this.setElseCpxFactors();
        this.setRegexCpxFactors();
        this.setDepthCpxFactors();
        this.setAggregationCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    /**
     * Sets the nesting and structural complexities for "usual" cases
     */
    setGeneralCaseCpxFactors() {
        this.cpxFactors.nesting[this.factorCategory] = cpx_factors_1.cpxFactors.nesting[this.factorCategory];
        this.cpxFactors.structural[this.factorCategory] = cpx_factors_1.cpxFactors.structural[this.factorCategory];
    }
    /**
     * Sets the complexity index corresponding to "basic" factor (ie basic weight for all the AST nodes)
     */
    setBasicCpxFactors() {
        this.cpxFactors.basic.node = this.factorCategory === node_feature_enum_1.NodeFeature.EMPTY ? 0 : cpx_factors_1.cpxFactors.basic.node;
    }
    /**
     * Sets depth complexity factor
     * Example : array in array, like a[b[c]]
     */
    setDepthCpxFactors() {
        if (ast_service_1.Ast.isArrayIndex(this)) {
            this.cpxFactors.depth.arr = cpx_factors_1.cpxFactors.depth.arr;
        }
    }
    /**
     * Sets aggregation complexity factor
     */
    setAggregationCpxFactors() {
        if (ast_service_1.Ast.isArrayOfArray(this)) {
            this.cpxFactors.aggregation.arr = cpx_factors_1.cpxFactors.aggregation.arr;
        }
        else if (ast_service_1.Ast.isDifferentLogicDoor(this)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpx_factors_1.cpxFactors.aggregation.differentLogicDoor;
        }
    }
    /**
     * Sets complexity factor for "else" case
     */
    setElseCpxFactors() {
        if (ast_service_1.Ast.isElseStatement(this)) {
            this.cpxFactors.structural.conditional = cpx_factors_1.cpxFactors.structural.conditional;
        }
        if (ast_service_1.Ast.isElseIfStatement(this)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    }
    /**
     * Sets complexity factor for callbacks and recursions
     */
    setRecursionOrCallbackCpxFactors() {
        this.cpxFactors.recursion.recursivity = this.isRecursiveMethod ? cpx_factors_1.cpxFactors.recursion.recursivity : 0;
        this.cpxFactors.recursion.callback = this.isCallback ? cpx_factors_1.cpxFactors.recursion.callback : 0;
    }
    /**
     * Sets complexity factor for regex
     */
    setRegexCpxFactors() {
        if (this.factorCategory === node_feature_enum_1.NodeFeature.REGEX) {
            this.cpxFactors.aggregation.regex = +((this['text'].length - 2) * cpx_factors_1.cpxFactors.aggregation.regex).toFixed(2);
        }
    }
    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    addParentCpx() {
        var _a, _b, _c, _d, _e;
        if (this && this.parent && ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.cpxFactors) === null || _b === void 0 ? void 0 : _b.nesting)) {
            this.cpxFactors.nesting = tools_service_1.addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this && ((_c = this.parent) === null || _c === void 0 ? void 0 : _c.parent) && ((_e = (_d = this.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth)) {
            this.cpxFactors.depth = tools_service_1.addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }
    logg(message) {
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST NODE'));
        console.log(this.kind, this.name);
        console.log('-----------------------------');
        console.log('pos', this.pos, 'end', this.end);
        console.log('text', this.text);
    }
}
exports.AstNode = AstNode;
_astFile = new WeakMap(), _astMethod = new WeakMap(), _astNodeService = new WeakMap(), _children = new WeakMap(), _context = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _factorCategory = new WeakMap(), _intrinsicDepthCpx = new WeakMap(), _intrinsicNestingCpx = new WeakMap(), _isCallback = new WeakMap(), _isRecursiveMethod = new WeakMap(), _kind = new WeakMap(), _name = new WeakMap(), _parent = new WeakMap(), _pos = new WeakMap(), _text = new WeakMap();
