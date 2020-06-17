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
var _astFiles, _children, _parent, _path;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFolder = void 0;
const chalk = require("chalk");
class TsFolder {
    constructor() {
        _astFiles.set(this, []); // The array of files of this folder (not in the subfolders)
        _children.set(this, []); // The subfolders of this folder
        _parent.set(this, undefined); // The TsFolder corresponding to the parent folder of this TsFolder
        _path.set(this, undefined); // The absolute path of this folder
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
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
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
exports.TsFolder = TsFolder;
_astFiles = new WeakMap(), _children = new WeakMap(), _parent = new WeakMap(), _path = new WeakMap();
