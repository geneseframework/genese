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
var _children, _end, _name, _text, _treeFolder;
Object.defineProperty(exports, "__esModule", { value: true });
const ast_node_model_1 = require("./ast-node.model");
const ast_kind_enum_1 = require("../enums/ast-kind.enum");
class AstFile {
    constructor() {
        // ---------------------------------------------------------------------------------
        //                                Mandatory properties
        // ---------------------------------------------------------------------------------
        _children.set(this, []);
        _end.set(this, 0);
        _name.set(this, '');
        _text.set(this, '');
        // ---------------------------------------------------------------------------------
        //                                Other properties
        // ---------------------------------------------------------------------------------
        _treeFolder.set(this, undefined);
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
        return __classPrivateFieldGet(this, _name);
    }
    set name(name) {
        __classPrivateFieldSet(this, _name, name);
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
    /**
     * Gets the stats of this TreeFile
     */
    // getStats(): Stats {
    // if (!this.stats) {
    //     this.stats = this.astFileService.getStats(this);
    // }
    // return this.stats;
    // }
    log(message) {
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
        console.log('treeFolder', __classPrivateFieldGet(this, _treeFolder));
    }
}
exports.AstFile = AstFile;
_children = new WeakMap(), _end = new WeakMap(), _name = new WeakMap(), _text = new WeakMap(), _treeFolder = new WeakMap();
