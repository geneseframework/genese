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
var _sourceFile, _treeMethods, _treeNode, _treeNodes;
Object.defineProperty(exports, "__esModule", { value: true });
const tree_folder_model_1 = require("./tree-folder.model");
const tree_file_service_1 = require("../../services/tree/tree-file.service");
const evaluable_model_1 = require("../evaluable.model");
const tree_method_service_1 = require("../../services/tree/tree-method.service");
/**
 * Element of the TreeNode structure corresponding to a given file (AST sourceFile)
 */
class TreeFile extends evaluable_model_1.Evaluable {
    constructor() {
        super();
        this.complexitiesByStatus = undefined; // The file complexities spread by complexity status
        this.cpxIndex = 0; // The complexity index of this file
        this.name = ''; // The name of this file
        _sourceFile.set(this, undefined); // The Typescript SourceFile
        this.stats = undefined; // The statistics of the file
        this.treeFileService = new tree_file_service_1.TreeFileService(); // The service for TreeFiles
        this.treeFolder = new tree_folder_model_1.TreeFolder(); // The TreeFolder which includes this TreeFile
        _treeMethods.set(this, []); // The TreeMethods included in this TreeFile
        _treeNode.set(this, undefined); // The TreeNode corresponding to the file itself
        _treeNodes.set(this, undefined); // The TreeNode corresponding to the file itself
        this.treeFileService.treeFile = this;
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get sourceFile() {
        return __classPrivateFieldGet(this, _sourceFile);
    }
    set sourceFile(source) {
        __classPrivateFieldSet(this, _sourceFile, source);
    }
    get treeMethods() {
        return __classPrivateFieldGet(this, _treeMethods);
    }
    set treeMethods(treeMethods) {
        __classPrivateFieldSet(this, _treeMethods, treeMethods);
    }
    get treeNode() {
        return __classPrivateFieldGet(this, _treeNode);
    }
    set treeNode(treeNode) {
        __classPrivateFieldSet(this, _treeNode, treeNode);
    }
    get treeNodes() {
        return __classPrivateFieldGet(this, _treeNodes);
    }
    set treeNodes(treeNodes) {
        __classPrivateFieldSet(this, _treeNodes, treeNodes);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of this TreeFile
     */
    evaluate() {
        const treeMethodService = new tree_method_service_1.TreeMethodService();
        for (const treeNode of __classPrivateFieldGet(this, _treeNodes)) {
            treeNode.evaluate();
        }
        for (const method of this.treeMethods) {
            method.evaluate();
            this.cpxIndex += method.cpxIndex;
            this.cyclomaticCpx += method.cyclomaticCpx;
            this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }
    /**
     * Gets the stats of this TreeFile
     */
    getStats() {
        if (!this.stats) {
            this.stats = this.treeFileService.getStats(this);
        }
        return this.stats;
    }
}
exports.TreeFile = TreeFile;
_sourceFile = new WeakMap(), _treeMethods = new WeakMap(), _treeNode = new WeakMap(), _treeNodes = new WeakMap();
