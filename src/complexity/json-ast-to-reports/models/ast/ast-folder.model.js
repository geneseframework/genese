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
var _astFiles, _astFolderService, _children, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _numberOfFiles, _numberOfMethods, _parent, _path, _relativePath, _stats;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFolder = void 0;
const complexities_by_status_interface_1 = require("../../interfaces/complexities-by-status.interface");
const cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
const ast_folder_service_1 = require("../../services/ast/ast-folder.service");
const chalk = require("chalk");
class AstFolder {
    constructor() {
        _astFiles.set(this, []); // The array of files of this folder (not in the subfolders)
        _astFolderService.set(this, new ast_folder_service_1.AstFolderService()); // The service managing AstFolders
        _children.set(this, []); // The subfolders of this folder
        _complexitiesByStatus.set(this, new complexities_by_status_interface_1.ComplexitiesByStatus()); // The folder complexities spread by complexity status
        _cpxFactors.set(this, undefined); // The complexity factors of the AstFolder
        _cyclomaticCpx.set(this, 0); // The cyclomatic complexity of the AstFolder
        _numberOfFiles.set(this, undefined); // The number of files of the AstFolder
        _numberOfMethods.set(this, undefined); // The number of methods of the AstFolder
        _parent.set(this, undefined); // The AstFolder corresponding to the parent folder of this AstFolder
        _path.set(this, undefined); // The absolute path of this folder
        _relativePath.set(this, undefined); // The relative path of this folder compared to the root folder of the analyse
        _stats.set(this, undefined); // The stats corresponding to this folder
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFiles() {
        return __classPrivateFieldGet(this, _astFiles);
    }
    set astFiles(astFiles) {
        __classPrivateFieldSet(this, _astFiles, astFiles);
    }
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(children) {
        __classPrivateFieldSet(this, _children, children);
    }
    get complexitiesByStatus() {
        return __classPrivateFieldGet(this, _complexitiesByStatus);
    }
    set complexitiesByStatus(complexitiesByStatus) {
        __classPrivateFieldSet(this, _complexitiesByStatus, complexitiesByStatus);
    }
    get cpxFactors() {
        if (__classPrivateFieldGet(this, _cpxFactors)) {
            return __classPrivateFieldGet(this, _cpxFactors);
        }
        this.evaluate();
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
    get numberOfFiles() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _numberOfFiles)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getNumberOfFiles(this);
    }
    set numberOfFiles(numberOfFiles) {
        __classPrivateFieldSet(this, _numberOfFiles, numberOfFiles);
    }
    get numberOfMethods() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _numberOfMethods)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getNumberOfMethods(this);
    }
    set numberOfMethods(numberOfMethods) {
        __classPrivateFieldSet(this, _numberOfMethods, numberOfMethods);
    }
    get parent() {
        return __classPrivateFieldGet(this, _parent);
    }
    set parent(parent) {
        __classPrivateFieldSet(this, _parent, parent);
    }
    get path() {
        return __classPrivateFieldGet(this, _path);
    }
    set path(path) {
        __classPrivateFieldSet(this, _path, path);
    }
    get relativePath() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _relativePath)) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _astFolderService).getRelativePath(this);
    }
    get stats() {
        return __classPrivateFieldGet(this, _stats);
    }
    set stats(stats) {
        __classPrivateFieldSet(this, _stats, stats);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates and sets the complexities of the AstFiles of this AstFolder (including its subfolders)
     */
    evaluate() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        this.evaluateCpxFactors(this);
        this.numberOfMethods = __classPrivateFieldGet(this, _astFolderService).getNumberOfMethods(this);
        this.stats = __classPrivateFieldGet(this, _astFolderService).calculateStats(this);
    }
    /**
     * Evaluates and sets the complexities of the AstFiles of a given AstFolder (including its subfolders)
     * @param astFolder     // The "parent" AstFolder
     */
    evaluateCpxFactors(astFolder) {
        for (const astFile of astFolder.astFiles) {
            astFile.evaluate();
            this.addCpx(astFile);
        }
        for (const childAstFolder of astFolder.children) {
            childAstFolder.evaluate();
            this.addCpx(childAstFolder);
        }
    }
    addCpx(element) {
        this.cpxFactors = this.cpxFactors.add(element.cpxFactors);
        this.cyclomaticCpx = this.cyclomaticCpx + element.cyclomaticCpx;
        this.complexitiesByStatus = this.complexitiesByStatus.add(element.complexitiesByStatus);
    }
    /**
     * Logs the main elements of the AstFolder
     * @param message       // An optional message
     */
    logg(message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), (_a = this.parent) === null || _a === void 0 ? void 0 : _a.path);
        for (const astFile of this.astFiles) {
            const name = (_b = astFile === null || astFile === void 0 ? void 0 : astFile.name) !== null && _b !== void 0 ? _b : '';
            console.log(chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile === null || astFile === void 0 ? void 0 : astFile.astNode, `  `);
        }
    }
    /**
     * Logs the main elements of the children of the AstFolder's AstNode
     * @param astNode       // The AstNode of the AstFolder
     * @param indent        // The indentation of the current AstNode (in the log)
     */
    loggChildren(astNode, indent = '') {
        var _a;
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            const name = (_a = childAstNode === null || childAstNode === void 0 ? void 0 : childAstNode.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `);
        }
    }
}
exports.AstFolder = AstFolder;
_astFiles = new WeakMap(), _astFolderService = new WeakMap(), _children = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _numberOfFiles = new WeakMap(), _numberOfMethods = new WeakMap(), _parent = new WeakMap(), _path = new WeakMap(), _relativePath = new WeakMap(), _stats = new WeakMap();
