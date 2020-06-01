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
var _cpxFactors, _feature, _nestingCpx;
Object.defineProperty(exports, "__esModule", { value: true });
const evaluable_model_1 = require("../evaluable.model");
const node_feature_enum_1 = require("../../enums/node-feature.enum");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const cpx_factors_1 = require("../../cpx-factors");
const tools_service_1 = require("../../services/tools.service");
const node_feature_service_1 = require("../../services/node-feature.service");
const chalk = require('chalk');
/**
 * The formatted tree of elements corresponding to an Abstract Syntax TreeNode (AST)
 */
class TreeNode extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.children = []; // The children trees corresponding to children AST nodes of the current AST node
        _cpxFactors.set(this, new cpx_factors_model_1.CpxFactors());
        _feature.set(this, undefined);
        this.kind = ''; // The kind of the node ('MethodDeclaration, IfStatement, ...)
        _nestingCpx.set(this, undefined); // The nesting of the node inside a given method
        this.node = undefined; // The current node in the AST
        this.nodeFeatureService = new node_feature_service_1.NodeFeatureService();
        this.treeMethod = undefined; // The method at the root of the current tree (if this tree is inside a method)
    }
    /**
     * Mandatory method for IsAstNode interface
     */
    evaluate() {
        this.calculateCpxFactors();
    }
    get nestingCpx() {
        return this.cpxFactors.totalNesting;
    }
    set nestingCpx(cpx) {
        __classPrivateFieldSet(this, _nestingCpx, cpx);
    }
    get intrinsicNestingCpx() {
        return this.nodeFeatureService.getCpxFactors(this.nodeFeatureService.getFeature(this.node)).totalNesting;
    }
    get feature() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _feature)) !== null && _a !== void 0 ? _a : this.nodeFeatureService.getFeature(this.node);
    }
    get cpxFactors() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _cpxFactors)) !== null && _a !== void 0 ? _a : this.nodeFeatureService.getCpxFactors(this.feature);
    }
    set cpxFactors(cpxFactors) {
        __classPrivateFieldSet(this, _cpxFactors, cpxFactors);
    }
    /**
     * Checks if an AST node inside a method is a recursion, ie a call to this method.
     * The current TreeNode must be a descendant of a method (ie a TreeNode with node of type MethodDescription)
     */
    isRecursion() {
        var _a, _b;
        if (!this.treeMethod) {
            return false;
        }
        return ((_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a['name']) === null || _b === void 0 ? void 0 : _b['escapedText']) === this.treeMethod.name;
    }
    calculateCpxFactors() {
        this.cpxFactors.basic.node = this.feature === node_feature_enum_1.NodeFeature.EMPTY ? 0 : cpx_factors_1.cpxFactors.basic.node;
        if (this.isRecursion()) {
            this.cpxFactors.structural.recursion = cpx_factors_1.cpxFactors.structural.recursion;
        }
        switch (this.feature) {
            case node_feature_enum_1.NodeFeature.BASIC:
                break;
            case node_feature_enum_1.NodeFeature.BINARY:
                this.addBinaryCpxFactors();
                break;
            case node_feature_enum_1.NodeFeature.CONDITIONAL:
                this.cpxFactors.nesting.conditional = cpx_factors_1.cpxFactors.nesting.conditional;
                this.cpxFactors.structural.conditional = cpx_factors_1.cpxFactors.structural.conditional;
                break;
            case node_feature_enum_1.NodeFeature.FUNC:
                this.cpxFactors.structural.func = cpx_factors_1.cpxFactors.structural.func;
                break;
            case node_feature_enum_1.NodeFeature.LOGIC_DOOR:
                this.cpxFactors.structural.logicDoor = cpx_factors_1.cpxFactors.structural.logicDoor;
                break;
            case node_feature_enum_1.NodeFeature.REGEX:
                this.cpxFactors.structural.regex = cpx_factors_1.cpxFactors.structural.regex;
                break;
        }
        this.calculateNestingCpx();
    }
    calculateNestingCpx() {
        var _a, _b, _c, _d;
        if (this.node && ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.node) && ((_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.cpxFactors) === null || _d === void 0 ? void 0 : _d.nesting)) {
            this.cpxFactors.nesting = tools_service_1.addObjects(this.parent.cpxFactors.nesting, this.cpxFactors.nesting);
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
            console.log(indent, chalk[color](childTree.kind), 'nesting', childTree.nestingCpx, 'parent', tsTree.kind);
            const newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    }
}
exports.TreeNode = TreeNode;
_cpxFactors = new WeakMap(), _feature = new WeakMap(), _nestingCpx = new WeakMap();
