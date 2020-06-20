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
var _cpxFactors, _cyclomaticCpx;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAst = void 0;
const chalk = require("chalk");
class JsonAst {
    constructor() {
        this.astFolder = undefined;
        // #astFolder?: AstFolder = undefined;
        _cpxFactors.set(this, undefined);
        _cyclomaticCpx.set(this, 0);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    // get astFolder(): AstFolder {
    //     return this.#astFolder;
    // }
    //
    //
    // set astFolder(astFolder: AstFolder) {
    //     this.#astFolder = astFolder;
    // }
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
    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------
    evaluate() {
        this.astFolder.evaluate();
        // this.cpxFactors = this.astFolder.cpxFactors;
        __classPrivateFieldSet(this, _cyclomaticCpx, this.astFolder.cyclomaticCpx);
    }
    logg(message) {
        var _a, _b, _c, _d, _e, _f;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'JSON_AST'));
        console.log((_a = this.astFolder) === null || _a === void 0 ? void 0 : _a.path);
        console.log('-----------------------------');
        for (const astFile of (_c = (_b = this.astFolder) === null || _b === void 0 ? void 0 : _b.astFiles) !== null && _c !== void 0 ? _c : []) {
            console.log(chalk.blueBright('astFile'), astFile === null || astFile === void 0 ? void 0 : astFile.name);
            console.log(chalk.blueBright('astFile astNode'), (_d = astFile === null || astFile === void 0 ? void 0 : astFile.astNode) === null || _d === void 0 ? void 0 : _d.kind);
            console.log(chalk.blueBright('astFile children'), (_e = astFile === null || astFile === void 0 ? void 0 : astFile.astNode) === null || _e === void 0 ? void 0 : _e.children);
            this.loggChildren(astFile.astNode);
        }
        console.log(chalk.blueBright('children'), (_f = this.astFolder) === null || _f === void 0 ? void 0 : _f.children);
    }
    loggChildren(astNode, indent = '') {
        var _a;
        for (const childAstNode of astNode === null || astNode === void 0 ? void 0 : astNode.children) {
            const name = (_a = childAstNode === null || childAstNode === void 0 ? void 0 : childAstNode.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright(`${indent}node`), childAstNode.kind, name);
            this.loggChildren(childAstNode, `${indent}  `);
        }
    }
}
exports.JsonAst = JsonAst;
_cpxFactors = new WeakMap(), _cyclomaticCpx = new WeakMap();
