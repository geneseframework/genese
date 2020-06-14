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
var _astFolder, _astMethods, _astNode, _children, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _end, _name, _stats, _text;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_node_model_1 = require("./ast-node.model");
const syntax_kind_enum_1 = require("../../enums/syntax-kind.enum");
const ast_file_service_1 = require("../../services/ast/ast-file.service");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const ast_method_service_1 = require("../../services/ast/ast-method.service");
class AstFile {
    constructor() {
        this.astFileService = new ast_file_service_1.AstFileService(); // The service for AstFiles
        _astFolder.set(this, undefined); // The AstFolder which includes this AstFile
        _astMethods.set(this, []); // The AstMethods included in this AstFile
        _astNode.set(this, undefined); // The AstNode corresponding to the file itself
        _children.set(this, []);
        _complexitiesByStatus.set(this, undefined); // The file complexities spread by complexity status
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _end.set(this, 0);
        _name.set(this, '');
        _stats.set(this, undefined); // The statistics of the file
        _text.set(this, '');
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFolder() {
        return __classPrivateFieldGet(this, _astFolder);
    }
    set astFolder(astFolder) {
        __classPrivateFieldSet(this, _astFolder, astFolder);
    }
    get astMethods() {
        return __classPrivateFieldGet(this, _astMethods);
    }
    set astMethods(astMethods) {
        __classPrivateFieldSet(this, _astMethods, astMethods);
    }
    get astNode() {
        if (__classPrivateFieldGet(this, _astNode)) {
            return this.astNode;
        }
        const astNode = new ast_node_model_1.AstNode();
        astNode.pos = 0;
        astNode.end = this.text.length; // TODO: fix
        astNode.kind = syntax_kind_enum_1.SyntaxKind.SourceFile;
        astNode.children = this.children;
        __classPrivateFieldSet(this, _astNode, astNode);
        return astNode;
    }
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(astNodes) {
        __classPrivateFieldSet(this, _children, astNodes);
    }
    get complexitiesByStatus() {
        return __classPrivateFieldGet(this, _complexitiesByStatus);
    }
    set complexitiesByStatus(cpxByStatus) {
        __classPrivateFieldSet(this, _complexitiesByStatus, cpxByStatus);
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
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get name() {
        return __classPrivateFieldGet(this, _name);
    }
    set name(name) {
        __classPrivateFieldSet(this, _name, name);
    }
    get stats() {
        return __classPrivateFieldGet(this, _stats);
    }
    set stats(stats) {
        __classPrivateFieldSet(this, _stats, stats);
    }
    get text() {
        return __classPrivateFieldGet(this, _text);
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
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        const astMethodService = new ast_method_service_1.AstMethodService();
        for (const child of __classPrivateFieldGet(this, _children)) {
            child.evaluate();
        }
        for (const method of this.astMethods) {
            method.evaluate();
            // this.cpxIndex += method.cpxIndex;
            this.cyclomaticCpx = this.cyclomaticCpx + method.cyclomaticCpx;
            this.complexitiesByStatus = astMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    }
    /**
     * Gets the stats of this AstFile
     */
    getStats() {
        if (!this.stats) {
            this.stats = this.astFileService.getStats(this);
        }
        return this.stats;
    }
    logg(message) {
        console.log('-----------------------------');
        console.log('LOG AST_FILE');
        console.log('-----------------------------');
        if (message) {
            console.log(message);
        }
        console.log('name', this.name);
        console.log('end', __classPrivateFieldGet(this, _end));
        console.log('text', __classPrivateFieldGet(this, _text));
        console.log('children', __classPrivateFieldGet(this, _children));
        console.log('astFolder', __classPrivateFieldGet(this, _astFolder));
    }
}
exports.AstFile = AstFile;
_astFolder = new WeakMap(), _astMethods = new WeakMap(), _astNode = new WeakMap(), _children = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _name = new WeakMap(), _stats = new WeakMap(), _text = new WeakMap();
