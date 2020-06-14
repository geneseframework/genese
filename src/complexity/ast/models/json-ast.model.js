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
var _astFilesFromJson, _astFolders;
Object.defineProperty(exports, "__esModule", { value: true });
class JsonAst {
    constructor() {
        // ---------------------------------------------------------------------------------
        //                                Mandatory property
        // ---------------------------------------------------------------------------------
        _astFilesFromJson.set(this, []);
        // ---------------------------------------------------------------------------------
        //                                Other properties
        // ---------------------------------------------------------------------------------
        _astFolders.set(this, []);
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    get astFiles() {
        return __classPrivateFieldGet(this, _astFilesFromJson);
    }
    set astFiles(astFiles) {
        __classPrivateFieldSet(this, _astFilesFromJson, astFiles !== null && astFiles !== void 0 ? astFiles : []);
    }
    get astFolders() {
        return __classPrivateFieldGet(this, _astFolders);
    }
    set astFolders(astFolders) {
        __classPrivateFieldSet(this, _astFolders, astFolders !== null && astFolders !== void 0 ? astFolders : []);
    }
}
exports.JsonAst = JsonAst;
_astFilesFromJson = new WeakMap(), _astFolders = new WeakMap();
