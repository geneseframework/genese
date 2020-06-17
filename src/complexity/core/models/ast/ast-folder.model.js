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
var _astFiles, _children, _complexitiesByStatus, _cpxFactors, _cyclomaticCpx, _parent, _path, _stats;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstFolder = void 0;
const complexities_by_status_interface_1 = require("../../../ast-to-reports/interfaces/complexities-by-status.interface");
const cpx_factors_model_1 = require("../../../ast-to-reports/models/cpx-factor/cpx-factors.model");
const ast_folder_service_1 = require("../../../ast-to-reports/services/ast/ast-folder.service");
const chalk = require("chalk");
class AstFolder {
    constructor() {
        _astFiles.set(this, []); // The array of files of this folder (not in the subfolders)
        _children.set(this, []); // The subfolders of this folder
        _complexitiesByStatus.set(this, new complexities_by_status_interface_1.ComplexitiesByStatus()); // The folder complexities spread by complexity status
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
        _parent.set(this, undefined); // The AstFolder corresponding to the parent folder of this AstFolder
        _path.set(this, undefined); // The absolute path of this folder
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
    // TODO : implement
    get relativePath() {
        return __classPrivateFieldGet(this, _path);
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
     * Evaluates the complexities of the TreeFiles of this AstFolder
     */
    evaluate() {
        this.cpxFactors = new cpx_factors_model_1.CpxFactors();
        for (const astFile of this.astFiles) {
            // TODO : evaluate AstFile
            astFile.evaluate();
            this.cpxFactors = this.cpxFactors.add(astFile.cpxFactors);
            this.cyclomaticCpx = this.cyclomaticCpx + astFile.cyclomaticCpx;
            this.complexitiesByStatus = this.complexitiesByStatus.add(astFile.complexitiesByStatus);
        }
        const astFolderService = new ast_folder_service_1.AstFolderService();
        this.stats = astFolderService.calculateStats(this);
    }
    logg(message) {
        var _a;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), (_a = this.parent) === null || _a === void 0 ? void 0 : _a.path);
        console.log(chalk.blueBright('children :'), this.children);
    }
}
exports.AstFolder = AstFolder;
_astFiles = new WeakMap(), _children = new WeakMap(), _complexitiesByStatus = new WeakMap(), _cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap(), _parent = new WeakMap(), _path = new WeakMap(), _stats = new WeakMap();
