"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
const fs = require("fs-extra");
const ts = require("typescript");
const file_service_1 = require("../../../core/services/file.service");
/**
 * Service for operations on TreeNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
class Ts {
    // ------------------------------------------------------------------------------------------------
    // ----------------------------------------   GETTERS   -------------------------------------------
    // ------------------------------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------------------------------
    // -------------------------------------   TYPE CHECKS   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Checks if an AST node is a BinaryExpression
     * @param node // The AST node
     */
    static isBinary(node) {
        var _a;
        return (_a = (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.BinaryExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if an AST node is a Block which is a "else"
     * @param node      // The node to analyse
     */
    static isBlock(node) {
        return ((node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.Block);
    }
    /**
     * Checks if an AST node is a Parameter
     * @param node // The AST node
     */
    static isCallExpression(node) {
        var _a;
        return (_a = (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.CallExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Returns true when the AST node is a logic door succeeding to a different logic door
     * a && b && c => returns false
     * a && b || c => returns true
     * (a && b) || c => returns false because of the brackets
     * @param node      // The node to analyse
     */
    static isDifferentLogicDoor(node) {
        if (Ts.isBinary(node) && Ts.isLogicDoor(node)) {
            if (Ts.isBinary(node.parent)
                && !Ts.isSameOperatorToken(node, node.parent)
                && !Ts.isOrTokenBetweenBinaries(node)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if an AST node is a IfStatement which is an "else if"
     * @param node      // The node to analyse
     */
    static isElseIfStatement(node) {
        var _a;
        return ((node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.IfStatement && ((_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.IfStatement);
    }
    /**
     * Checks if an AST node is a Block which is a "else"
     * @param node      // The node to analyse
     */
    static isElseStatement(node) {
        var _a, _b;
        return (Ts.isBlock(node)
            && ((_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.IfStatement
            && ((_b = node === null || node === void 0 ? void 0 : node.parent['elseStatement']) === null || _b === void 0 ? void 0 : _b.pos) === (node === null || node === void 0 ? void 0 : node.pos));
    }
    /**
     * Checks if an AST node is a function or a method
     * @param node
     */
    static isFunctionOrMethod(node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.MethodDeclaration || (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.FunctionDeclaration || false;
    }
    /**
     * Checks if an AST node is a function or a method
     * @param node
     */
    static isIdentifier(node) {
        return (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.Identifier;
    }
    /**
     * Checks if an AST node is a logic door (ie : || or &&)
     * @param node // The AST node to check
     */
    static isLogicDoor(node) {
        var _a, _b, _c;
        return (_c = (((_a = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.AmpersandAmpersandToken
            || ((_b = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.BarBarToken)) !== null && _c !== void 0 ? _c : false;
    }
    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ElementAccessExpression
     * @param node      // The node to analyse
     */
    static isCallIdentifier(node) {
        return (Ts.isCallExpression(node.parent) && Ts.isIdentifier(node));
    }
    /**
     * Checks if an AST node is "||" anf if this node is between two binary expressions
     * @param node
     */
    static isOrTokenBetweenBinaries(node) {
        var _a, _b, _c, _d;
        return (_d = (((_a = node === null || node === void 0 ? void 0 : node['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ts.SyntaxKind.BarBarToken
            && ((_b = node === null || node === void 0 ? void 0 : node['left']) === null || _b === void 0 ? void 0 : _b.kind) === ts.SyntaxKind.BinaryExpression
            && ((_c = node === null || node === void 0 ? void 0 : node['right']) === null || _c === void 0 ? void 0 : _c.kind) === ts.SyntaxKind.BinaryExpression)) !== null && _d !== void 0 ? _d : false;
    }
    /**
     * Checks if an AST node is a Parameter
     * @param node // The AST node
     */
    static isParam(node) {
        var _a;
        return (_a = (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.Parameter) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if an AST node is a PropertyAccessExpression
     * @param node // The AST node
     */
    static isPropertyAccessExpression(node) {
        var _a;
        return (_a = (node === null || node === void 0 ? void 0 : node.kind) === ts.SyntaxKind.PropertyAccessExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if two AST nodes have the same type
     * @param firstNode   // The first AST node
     * @param secondNode  // The second AST node
     */
    static isSameOperatorToken(firstNode, secondNode) {
        var _a, _b, _c;
        return (_c = ((_a = firstNode === null || firstNode === void 0 ? void 0 : firstNode['operatorToken']) === null || _a === void 0 ? void 0 : _a.kind) === ((_b = secondNode === null || secondNode === void 0 ? void 0 : secondNode['operatorToken']) === null || _b === void 0 ? void 0 : _b.kind)) !== null && _c !== void 0 ? _c : false;
    }
}
exports.Ts = Ts;
