"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cpxFactors, _feature, _intrinsicDepthCpx, _intrinsicNestingCpx, _isArrayIndex, _nestingCpx;
Object.defineProperty(exports, "__esModule", { value: true });
const evaluable_model_1 = require("../evaluable.model");
const node_feature_enum_1 = require("../../enums/node-feature.enum");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const cpx_factors_1 = require("../../cpx-factors");
const tools_service_1 = require("../../services/tools.service");
const node_feature_service_1 = require("../../services/node-feature.service");
const ast_service_1 = require("../../services/ast.service");
const chalk = require('chalk');
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
class TreeNode extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        _cpxFactors.set(this, new cpx_factors_model_1.CpxFactors()); // The complexity factors of the TreeNode
        _feature.set(this, undefined); // The NodeFeature of the node of the TreeNode
        _intrinsicDepthCpx.set(this, undefined); // The depth of the TreeNode inside its method (not including its parent's depth)
        _intrinsicNestingCpx.set(this, undefined); // The nesting of the TreeNode inside its method (not including its parent's nesting)
        _isArrayIndex.set(this, undefined); // True is the TreeNode is an array, false if not
        this.kind = ''; // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _nestingCpx.set(this, undefined); // The nesting of the TreeNode inside its method (including its parent's nesting)
        this.node = undefined; // The current node in the AST
        this.nodeFeatureService = new node_feature_service_1.NodeFeatureService(); // The service managing NodeFeatures
        this.treeMethod = undefined; // The method at the root of the current tree (if this tree is inside a method)
    }
    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate() {
        this.calculateAndSetCpxFactors();
        this.addParentCpx();
    }
    get depthCpx() {
        return this.cpxFactors.totalDepth;
    }
    get nestingCpx() {
        return this.cpxFactors.totalNesting;
    }
    set nestingCpx(cpx) {
        __classPrivateFieldSet(this, _nestingCpx, cpx);
    }
    /**
     * Gets the complexity of the node itself, not from its parents
     */
    get intrinsicNestingCpx() {
        return __classPrivateFieldGet(this, _intrinsicNestingCpx);
    }
    set intrinsicNestingCpx(cpx) {
        __classPrivateFieldSet(this, _intrinsicNestingCpx, cpx);
    }
    /**
     * Gets the complexity of the node itself, not from its parents
     */
    get intrinsicDepthCpx() {
        return __classPrivateFieldGet(this, _intrinsicDepthCpx);
    }
    set intrinsicDepthCpx(cpx) {
        __classPrivateFieldSet(this, _intrinsicDepthCpx, cpx);
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
    get feature() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _feature)) !== null && _a !== void 0 ? _a : this.nodeFeatureService.getFeature(this.node);
    }
    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The current TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isRecursion() {
        var _a, _b;
        if (!this.treeMethod) {
            return false;
        }
        return ((_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a['name']) === null || _b === void 0 ? void 0 : _b['escapedText']) === this.treeMethod.name;
    }
    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The current TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    get isArrayIndex() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _isArrayIndex)) !== null && _a !== void 0 ? _a : ast_service_1.Ast.isArrayIndex(this.node);
    }
    calculateAndSetCpxFactors() {
        this.setGeneralCaseCpxFactors();
        this.setBasicCpxFactors();
        this.setRecursionCpxFactors();
        this.setElseCpxFactors();
        this.setDepthCpxFactors();
        this.intrinsicNestingCpx = this.cpxFactors.totalNesting;
        this.intrinsicDepthCpx = this.cpxFactors.totalDepth;
        return __classPrivateFieldGet(this, _cpxFactors);
    }
    setGeneralCaseCpxFactors() {
        this.cpxFactors.nesting[this.feature] = cpx_factors_1.cpxFactors.nesting[this.feature];
        this.cpxFactors.structural[this.feature] = cpx_factors_1.cpxFactors.structural[this.feature];
        if (ast_service_1.Ast.isAggregated(this.node)) {
            this.cpxFactors.aggregation[this.feature] = cpx_factors_1.cpxFactors.aggregation[this.feature];
        }
    }
    setBasicCpxFactors() {
        this.cpxFactors.basic.node = this.feature === node_feature_enum_1.NodeFeature.EMPTY ? 0 : cpx_factors_1.cpxFactors.basic.node;
    }
    // TODO : refacto when depths different than arrays will be discovered
    setDepthCpxFactors() {
        if (this.isArrayIndex) {
            this.cpxFactors.depth.arr = cpx_factors_1.cpxFactors.depth.arr;
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
    setRecursionCpxFactors() {
        this.cpxFactors.structural.recursion = this.isRecursion ? cpx_factors_1.cpxFactors.structural.recursion : 0;
    }
    setArrayCpxFactors() {
    }
    /**
     * Sets the global nesting cpx of the node (the cpx from the node itself and from its parents)
     */
    addParentCpx() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.node && ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.node) && ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.cpxFactors) === null || _d === void 0 ? void 0 : _d.nesting)) {
            this.cpxFactors.nesting = tools_service_1.addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
        }
        if (this.node && ((_f = (_e = this.parent) === null || _e === void 0 ? void 0 : _e.parent) === null || _f === void 0 ? void 0 : _f.node) && ((_h = (_g = this.parent) === null || _g === void 0 ? void 0 : _g.cpxFactors) === null || _h === void 0 ? void 0 : _h.depth)) {
            this.cpxFactors.depth = tools_service_1.addObjects(this.parent.cpxFactors.depth, this.cpxFactors.depth);
        }
    }
    addBinaryCpxFactors() {
        this.cpxFactors = this.cpxFactors.add(this.nodeFeatureService.getBinaryCpxFactors(this));
    }
    // ------------------------------------------------------------------------------------------------
    // ---------------------------------------   PRINT AST   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Logs all the AST
     * This method runs, but is not yet used
     */
    printAllChildren() {
        var _a;
        console.log('------------------------------------');
        console.log('METHOD ', (_a = this.treeMethod) === null || _a === void 0 ? void 0 : _a.name);
        console.log('------------------------------------');
        this.printChildren(this, ' ');
    }
    /**
     * Logs the AST of the children trees
     * This method runs, but is not yet used
     * @tree // The tree to print
     * @indent // the indentation to use for the print
     */
    printChildren(tsTree, indent) {
        for (const childTree of tsTree.children) {
            let color = '';
            if (childTree.cpxFactors.total < 0.5) {
                color = 'white';
            }
            else {
                color = childTree.cpxFactors.total > 1 ? 'red' : 'yellow';
            }
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'depth', childTree.depthCpx, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }
}
exports.TreeNode = TreeNode;
_cpxFactors = new WeakMap(), _feature = new WeakMap(), _intrinsicDepthCpx = new WeakMap(), _intrinsicNestingCpx = new WeakMap(), _isArrayIndex = new WeakMap(), _nestingCpx = new WeakMap();
