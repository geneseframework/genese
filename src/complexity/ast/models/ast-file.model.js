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
var _children, _end, _path, _text, _name, _treeFolder;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_node_model_1 = require("./ast-node.model");
const ast_kind_enum_1 = require("../enums/ast-kind.enum");
const file_service_1 = require("../../services/file.service");
class AstFile {
    constructor() {
        // ---------------------------------------------------------------------------------
        //                                Mandatory properties
        // ---------------------------------------------------------------------------------
        _children.set(this, []);
        _end.set(this, 0);
        _path.set(this, '');
        _text.set(this, '');
        // ---------------------------------------------------------------------------------
        //                                Other properties
        // ---------------------------------------------------------------------------------
        _name.set(this, undefined);
        _treeFolder.set(this, undefined);
        /**
         * Gets the stats of this TreeFile
         */
        // getStats(): Stats {
        // if (!this.stats) {
        //     this.stats = this.astFileService.getStats(this);
        // }
        // return this.stats;
        // }
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astNode() {
        const astNode = new ast_node_model_1.AstNode();
        astNode.pos = 0;
        astNode.end = this.text.length; // TODO: fix
        astNode.kind = ast_kind_enum_1.AstKind.SOURCE_FILE;
        astNode.children = this.children;
        return astNode;
    }
    get children() {
        return __classPrivateFieldGet(this, _children);
    }
    set children(astNodes) {
        __classPrivateFieldSet(this, _children, astNodes);
    }
    get end() {
        return __classPrivateFieldGet(this, _end);
    }
    set end(end) {
        __classPrivateFieldSet(this, _end, end);
    }
    get name() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _name)) !== null && _a !== void 0 ? _a : file_service_1.getFilename(__classPrivateFieldGet(this, _path));
    }
    get path() {
        return __classPrivateFieldGet(this, _path);
    }
    set path(path) {
        __classPrivateFieldSet(this, _path, path);
    }
    get text() {
        return __classPrivateFieldGet(this, _text);
    }
    set text(text) {
        __classPrivateFieldSet(this, _text, text);
    }
    get treeFolder() {
        return __classPrivateFieldGet(this, _treeFolder);
    }
    set treeFolder(treeFolder) {
        __classPrivateFieldSet(this, _treeFolder, treeFolder);
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Evaluates the complexities of the TreeNodes and the TreeMethods of this TreeFile
     */
    evaluate() {
        // const treeMethodService = new TreeMethodService();
        // for (const treeNode of this.#treeNodes) {
        //     treeNode.evaluate();
        // }
        // for (const method of this.treeMethods) {
        //     method.evaluate();
        //     this.cpxIndex += method.cpxIndex;
        //     this.cyclomaticCpx += method.cyclomaticCpx;
        //     this.complexitiesByStatus = treeMethodService.addMethodCpxByStatus(this.complexitiesByStatus, method);
        // }
    }
}
exports.AstFile = AstFile;
_children = new WeakMap(), _end = new WeakMap(), _path = new WeakMap(), _text = new WeakMap(), _name = new WeakMap(), _treeFolder = new WeakMap();
