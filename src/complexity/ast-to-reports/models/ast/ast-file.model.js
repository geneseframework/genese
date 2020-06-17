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
var _astFolder, _astMethods, _astNode, _astNodes, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _end, _name, _stats, _text;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFile = void 0;
const ast_file_service_1 = require("../../services/ast/ast-file.service");
const cpx_factors_model_1 = require("../cpx-factor/cpx-factors.model");
const ast_method_service_1 = require("../../services/ast/ast-method.service");
const chalk = require("chalk");
class AstFile {
    constructor() {
        _astFolder.set(this, undefined); // The AstFolder which includes this AstFile
        _astMethods.set(this, []); // The AstMethods included in this AstFile
        _astNode.set(this, undefined); // The AstNode corresponding to the file itself
        _astNodes.set(this, undefined); // Array of all the AstNodes which are children of this.AstNode (including itself)
        _complexitiesByStatus.set(this, undefined); // The file complexities spread by complexity status
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _end.set(this, undefined);
        _name.set(this, undefined);
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
        if (__classPrivateFieldGet(this, _astMethods)) {
            return __classPrivateFieldGet(this, _astMethods);
        }
        return;
    }
    set astMethods(astMethods) {
        __classPrivateFieldSet(this, _astMethods, astMethods);
    }
    get astNode() {
        return __classPrivateFieldGet(this, _astNode);
    }
    set astNode(astNode) {
        __classPrivateFieldSet(this, _astNode, astNode);
    }
    get astNodes() {
        return __classPrivateFieldGet(this, _astNodes);
    }
    set astNodes(astNodes) {
        __classPrivateFieldSet(this, _astNodes, astNodes);
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
        var _a, _b;
        return (_a = __classPrivateFieldGet(this, _end)) !== null && _a !== void 0 ? _a : (_b = __classPrivateFieldGet(this, _astNode)) === null || _b === void 0 ? void 0 : _b.end;
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get name() {
        var _a, _b;
        return (_a = __classPrivateFieldGet(this, _name)) !== null && _a !== void 0 ? _a : (_b = __classPrivateFieldGet(this, _astNode)) === null || _b === void 0 ? void 0 : _b.name;
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
        this.astNode.evaluate();
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
            const astFileService = new ast_file_service_1.AstFileService(); // The service for AstFiles
            this.stats = astFileService.getStats(this);
        }
        return this.stats;
    }
    logg(message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('astNode :'), (_a = this.astNode) === null || _a === void 0 ? void 0 : _a.kind);
        console.log(chalk.blueBright('astFolder :'), (_b = this.astFolder) === null || _b === void 0 ? void 0 : _b.path);
    }
}
exports.AstFile = AstFile;
_astFolder = new WeakMap(), _astMethods = new WeakMap(), _astNode = new WeakMap(), _astNodes = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _end = new WeakMap(), _name = new WeakMap(), _stats = new WeakMap(), _text = new WeakMap();
