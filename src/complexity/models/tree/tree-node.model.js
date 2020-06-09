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
var _context, _cpxFactors, _feature, _intrinsicDepthCpx, _intrinsicNestingCpx, _isNodeContext, _kind, _name, _nestingCpx, _parentFunction;
Object.defineProperty(exports, "__esModule", { value: true });
const evaluable_model_1 = require("../evaluable.model");
const node_feature_enum_1 = require("../../enums/node-feature.enum");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const cpx_factors_1 = require("../../cpx-factors");
const tools_service_1 = require("../../services/tools.service");
const node_feature_service_1 = require("../../services/node-feature.service");
const ast_service_1 = require("../../services/ast.service");
const tree_node_service_1 = require("../../services/tree/tree-node.service");
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
class TreeNode extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        _context.set(this, undefined); // The context of the TreeNode
        _cpxFactors.set(this, new cpx_factors_model_1.CpxFactors()); // The complexity factors of the TreeNode
        _feature.set(this, undefined); // The NodeFeature of the node of the TreeNode
        _intrinsicDepthCpx.set(this, undefined); // The depth of the TreeNode inside its method (not including its parent's depth)
        _intrinsicNestingCpx.set(this, undefined); // The nesting of the TreeNode inside its method (not including its parent's nesting)
        _isNodeContext.set(this, undefined); // The node defines a new context : VariableDeclaration, FunctionExpression, ...
        _kind.set(this, undefined); // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _name.set(this, undefined); // The name of the TreeNode
        _nestingCpx.set(this, undefined); // The nesting of the TreeNode inside its method (including its parent's nesting)
        this.node = undefined; // The current node in the AST
        this.nodeFeatureService = new node_feature_service_1.NodeFeatureService(); // The service managing NodeFeatures
        _parentFunction.set(this, undefined); // The first function or method which a parent of the TreeNode
        this.treeMethod = undefined; // The method at the root of the current tree (if this tree is inside a method)
        this.treeNodeService = new tree_node_service_1.TreeNodeService(); // The service managing NodeFeatures
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get aggregationCpx() {
        return this.cpxFactors.totalAggregation;
    }
    /**
     * Gets the context of this TreeNode
     */
    get context() {
        var _a;
        // return
        return (_a = __classPrivateFieldGet(this, _context)) !== null && _a !== void 0 ? _a : this.treeNodeService.getNodeContext(this);
    }
    /**
     * Sets the context of this TreeNode
     */
    set context(treeNode) {
        __classPrivateFieldSet(this, _context, treeNode);
    }
    /**
     * Gets the first function or method which is a parent of this TreeNode
     */
    get parentFunction() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _parentFunction)) !== null && _a !== void 0 ? _a : this.treeNodeService.setParentFunction(this);
    }
    /**
     * Gets the global nesting complexity of the node, including the nesting cpx of its parents
     */
    get cpxFactors() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxFactors)) !== null && _a !== void 0 ? _a : this.calculateAndSetCpxFactors();
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    get depthCpx() {
        return this.cpxFactors.totalDepth;
    }
    get feature() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _feature)) !== null && _a !== void 0 ? _a : this.nodeFeatureService.getFeature(this.node);
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
    /**
     * Checks if this TreeNode is a recursion, ie a call to a parameter of its ParentFunction.
     * This TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isCallback() {
        return this.treeNodeService.isCallback(this);
    }
    get isFunction() {
        return this.feature === node_feature_enum_1.NodeFeature.FUNC;
    }
    get isMethodIdentifier() {
        return ast_service_1.Ast.isMethodIdentifier(this.node);
    }
    /**
     * Checks if this TreeNode defines a new context
     * Examples: VariableDeclaration, FunctionExpression, ...
     */
    get isNodeContext() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _isNodeContext)) !== null && _a !== void 0 ? _a : this.treeNodeService.isContext(this);
    }
    /**
     * Sets the value of #isNodeContext
     * @param bool      // The value to set
     */
    set isNodeContext(bool) {
        __classPrivateFieldSet(this, _isNodeContext, bool);
    }
    get isParam() {
        return ast_service_1.Ast.isParam(this.node);
    }
    /**
     * Checks if this TreeNode is a recursion, ie a call to this ParentFunction.
     * This TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isRecursion() {
        return this.treeNodeService.isRecursion(this);
    }
    get kind() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _kind)) !== null && _a !== void 0 ? _a : ast_service_1.Ast.getType(this.node);
    }
    set kind(kind) {
        __classPrivateFieldSet(this, _kind, kind);
    }
    get name() {
        var _a, _b, _c, _d, _e;
        if (__classPrivateFieldGet(this, _name)) {
            return __classPrivateFieldGet(this, _name);
        }
        __classPrivateFieldSet(this, _name, (_e = (_c = (_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a['name']) === null || _b === void 0 ? void 0 : _b['escapedText']) !== null && _c !== void 0 ? _c : (_d = this.node) === null || _d === void 0 ? void 0 : _d['escapedText']) !== null && _e !== void 0 ? _e : ast_service_1.Ast.getType(this.node));
        return __classPrivateFieldGet(this, _name);
    }
    get nestingCpx() {
        return this.cpxFactors.totalNesting;
    }
    set nestingCpx(cpx) {
        __classPrivateFieldSet(this, _nestingCpx, cpx);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate() {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
    }
    calculateAndSetCpxFactors() {
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
    setGeneralCaseCpxFactors() {
        this.cpxFactors.nesting[this.feature] = cpx_factors_1.cpxFactors.nesting[this.feature];
        this.cpxFactors.structural[this.feature] = cpx_factors_1.cpxFactors.structural[this.feature];
    }
    setBasicCpxFactors() {
        this.cpxFactors.basic.node = this.feature === node_feature_enum_1.NodeFeature.EMPTY ? 0 : cpx_factors_1.cpxFactors.basic.node;
    }
    // TODO : refacto when depths different than arrays will be discovered
    setDepthCpxFactors() {
        if (ast_service_1.Ast.isArrayIndex(this.node)) {
            this.cpxFactors.depth.arr = cpx_factors_1.cpxFactors.depth.arr;
        }
    }
    setAggregationCpxFactors() {
        if (ast_service_1.Ast.isArrayOfArray(this.node)) {
            this.cpxFactors.aggregation.arr = cpx_factors_1.cpxFactors.aggregation.arr;
        }
        else if (ast_service_1.Ast.isDifferentLogicDoor(this.node)) {
            this.cpxFactors.aggregation.differentLogicDoor = cpx_factors_1.cpxFactors.aggregation.differentLogicDoor;
        }
    }
    setElseCpxFactors() {
        if (ast_service_1.Ast.isElseStatement(this.node)) {
            this.cpxFactors.structural.conditional = cpx_factors_1.cpxFactors.structural.conditional;
        }
        if (ast_service_1.Ast.isElseIfStatement(this.node)) {
            this.cpxFactors.nesting.conditional = 0;
        }
    }
    setRecursionOrCallbackCpxFactors() {
        this.cpxFactors.structural.recursion = this.isRecursion ? cpx_factors_1.cpxFactors.structural.recursion : 0;
        this.cpxFactors.structural.callback = this.isCallback ? cpx_factors_1.cpxFactors.structural.callback : 0;
    }
    setRegexCpxFactors() {
        if (this.feature === node_feature_enum_1.NodeFeature.REGEX) {
            this.cpxFactors.aggregation.regex = +((this.node['text'].length - 2) * cpx_factors_1.cpxFactors.aggregation.regex).toFixed(2);
        }
    }
    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    addParentCpx() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this.node && ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.node) && ((_c = (_b = this.parent) === null || _b === void 0 ? void 0 : _b.cpxFactors) === null || _c === void 0 ? void 0 : _c.nesting)) {
            this.cpxFactors.nesting = tools_service_1.addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this.node && ((_e = (_d = this.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.node) && ((_g = (_f = this.parent) === null || _f === void 0 ? void 0 : _f.cpxFactors) === null || _g === void 0 ? void 0 : _g.depth)) {
            this.cpxFactors.depth = tools_service_1.addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }
}
exports.TreeNode = TreeNode;
_context = new WeakMap(), _cpxFactors = new WeakMap(), _feature = new WeakMap(), _intrinsicDepthCpx = new WeakMap(), _intrinsicNestingCpx = new WeakMap(), _isNodeContext = new WeakMap(), _kind = new WeakMap(), _name = new WeakMap(), _nestingCpx = new WeakMap(), _parentFunction = new WeakMap();
