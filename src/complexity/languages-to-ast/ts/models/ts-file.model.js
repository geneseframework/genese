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
var _end, _name, _sourceFile, _text, _tsNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFile = void 0;
const chalk = require("chalk");
class TsFile {
    constructor() {
        _end.set(this, undefined);
        _name.set(this, undefined);
        _sourceFile.set(this, undefined); // The Typescript JsonAst
        _text.set(this, '');
        _tsNode.set(this, undefined); // The TsNode corresponding to the file itself
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get end() {
        var _a, _b;
        return (_a = __classPrivateFieldGet(this, _end)) !== null && _a !== void 0 ? _a : (_b = __classPrivateFieldGet(this, _tsNode)) === null || _b === void 0 ? void 0 : _b.end;
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get name() {
        var _a, _b;
        return (_a = __classPrivateFieldGet(this, _name)) !== null && _a !== void 0 ? _a : (_b = __classPrivateFieldGet(this, _tsNode)) === null || _b === void 0 ? void 0 : _b.name;
    }
    set name(name) {
        __classPrivateFieldSet(this, _name, name);
    }
    get sourceFile() {
        return __classPrivateFieldGet(this, _sourceFile);
    }
    set sourceFile(source) {
        __classPrivateFieldSet(this, _sourceFile, source);
    }
    get text() {
        return __classPrivateFieldGet(this, _text);
    }
    set text(text) {
        __classPrivateFieldSet(this, _text, text);
    }
    get tsNode() {
        return __classPrivateFieldGet(this, _tsNode);
    }
    set tsNode(tsNode) {
        __classPrivateFieldSet(this, _tsNode, tsNode);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    logg(message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('tsNode :'), (_a = this.tsNode) === null || _a === void 0 ? void 0 : _a.kind);
        console.log(chalk.blueBright('tsNode children :'), (_b = this.tsNode) === null || _b === void 0 ? void 0 : _b.children);
    }
}
exports.TsFile = TsFile;
_end = new WeakMap(), _name = new WeakMap(), _sourceFile = new WeakMap(), _text = new WeakMap(), _tsNode = new WeakMap();
