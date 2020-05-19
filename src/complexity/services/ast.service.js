"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var ts = require("typescript");
var file_service_1 = require("./file.service");
/**
 * Service for operations on Tree elements relative to a given node in Abstract Syntax Tree (AST)
 */
var Ast = /** @class */ (function () {
    function Ast() {
    }
    /**
     * Gets the typescript SourceFile of a given file
     * @param path // The absolute path of the file
     */
    Ast.getSourceFile = function (path) {
        return ts.createSourceFile(file_service_1.getFilename(path), fs.readFileSync(path, 'utf-8'), ts.ScriptTarget.Latest);
    };
    /**
     * Gets the type of a node in the AST (MethodDeclaration, IfStatement, ...)
     * @param node // The node in the AST
     */
    Ast.getType = function (node) {
        return node ? ts.SyntaxKind[node.kind] : '';
    };
    /**
     * Gets the name of the method of a node with type = MethodDeclaration
     * @param node // The AST node
     */
    Ast.getMethodName = function (node) {
        var _a, _b;
        if ((node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.MethodDeclaration) {
            return (_b = (_a = node === null || node === void 0 ? void 0 : node['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) !== null && _b !== void 0 ? _b : '';
        }
        else {
            return '';
        }
    };
    /**
     * Checks if an AST node is a BinaryExpression
     * @param node // The AST node
     */
    Ast.isBinary = function (node) {
        var _a;
        return (_a = (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.BinaryExpression) !== null && _a !== void 0 ? _a : false;
    };
    /**
     * Checks if an AST node is a logic door (ie : || or &&)
     * @param node // The AST node to check
     */
    Ast.isLogicDoor = function (node) {
        var _a, _b, _c;
        return (_c = (((_a = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.AmpersandAmpersandToken
            || ((_b = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.BarBarToken)) !== null && _c !== void 0 ? _c : false;
    };
    /**
     * Checks if an AST node is "||" anf if this node is between two binary expressions
     * @param node
     */
    Ast.isOrTokenBetweenBinaries = function (node) {
        var _a, _b, _c, _d;
        return (_d = (((_a = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.BarBarToken
            && ((_b = node === null || node === void 0 ? void 0 : node['left']) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.BinaryExpression
            && ((_c = node === null || node === void 0 ? void 0 : node['right']) === null || _c === void 0 ? void 0 : _c.kind) === ts.SyntaxKind.BinaryExpression)) !== null && _d !== void 0 ? _d : false;
    };
    /**
     * Checks if two AST nodes have the same type
     * @param firstNode   // The first AST node
     * @param secondNode  // The second AST node
     */
    Ast.isSameOperatorToken = function (firstNode, secondNode) {
        var _a, _b, _c;
        return (_c = ((_a = firstNode === null || firstNode === void 0 ? void 0 : firstNode['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ((_b = secondNode === null || secondNode === void 0 ? void 0 : secondNode['operatorToken']) === null || _b === void 0 ? void 0 : _b.kind)) !== null && _c !== void 0 ? _c : false;
    };
    return Ast;
}());
exports.Ast = Ast;
