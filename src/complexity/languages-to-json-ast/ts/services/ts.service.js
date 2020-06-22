"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
const fs = require("fs-extra");
const ts = require("typescript");
const file_service_1 = require("../../../core/services/file.service");
/**
 * Service for operations on TsNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
class Ts {
    /**
     * Gets the end position of a node in the AST
     * @param node // The node in the AST
     */
    static getEnd(node) {
        return node === null || node === void 0 ? void 0 : node.end;
    }
    /**
     * Gets the type of a node in the AST (MethodDeclaration, IfStatement, ...)
     * @param node // The node in the AST
     */
    static getKind(node) {
        return node ? ts.SyntaxKind[node.kind] : '';
    }
    /**
     * Gets the name of the method of a node with type = MethodDeclaration
     * @param node // The AST node
     */
    static getName(node) {
        var _a, _b, _c;
        switch (node === null || node === void 0 ? void 0 : node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.Parameter:
                return (_b = (_a = node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) !== null && _b !== void 0 ? _b : '';
            case ts.SyntaxKind.Identifier:
                return (_c = node['escapedText']) !== null && _c !== void 0 ? _c : '';
            default:
                return undefined;
        }
    }
    /**
     * Gets the position of a node in the AST
     * @param node // The node in the AST
     */
    static getPosition(node) {
        return node === null || node === void 0 ? void 0 : node.pos;
    }
    /**
     * Gets the typescript JsonAst of a given file
     * @param path // The absolute path of the file
     */
    static getSourceFile(path) {
        return ts.createSourceFile(file_service_1.getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    }
    static getTextFile(path) {
        var _a;
        return (_a = Ts.getSourceFile(path)) === null || _a === void 0 ? void 0 : _a.text;
    }
}
exports.Ts = Ts;
