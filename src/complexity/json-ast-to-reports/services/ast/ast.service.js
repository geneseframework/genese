"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ast = void 0;
const ast_may_define_context_enum_1 = require("../../enums/ast-may-define-context.enum");
const syntax_kind_enum_1 = require("../../../core/enum/syntax-kind.enum");
/**
 * Service for operations on TreeNode elements relative to a given node in Abstract Syntax TreeNode (AST)
 */
class Ast {
    /**
     * Checks if an AstNode may define context
     * @param astNode
     */
    static mayDefineContext(astNode) {
        return Object.values(ast_may_define_context_enum_1.AstMayDefineContext).includes(astNode.kind);
    }
    // ------------------------------------------------------------------------------------------------
    // -------------------------------------   TYPE CHECKS   ------------------------------------------
    // ------------------------------------------------------------------------------------------------
    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isArrayIndex(astNode) {
        var _a;
        return (((_a = astNode === null || astNode === void 0 ? void 0 : astNode.parent) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.ElementAccessExpression && (astNode === null || astNode === void 0 ? void 0 : astNode.parent.secondSon) === astNode);
    }
    /**
     * Checks if an AST node is an array of array, ie if it's an ELEMENT_ACCESS_EXPRESSION which is the first son of another ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isArrayOfArray(astNode) {
        var _a, _b;
        return (((_a = astNode === null || astNode === void 0 ? void 0 : astNode.parent) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.ElementAccessExpression && (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.ElementAccessExpression && (astNode === null || astNode === void 0 ? void 0 : astNode.pos) === ((_b = astNode.parent) === null || _b === void 0 ? void 0 : _b.pos));
    }
    /**
     * Checks if an AST node is a BinaryExpression
     * @param astNode // The AST node
     */
    static isBinary(astNode) {
        var _a;
        return (_a = (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.BinaryExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if an AST node is a Block which is a "else"
     * @param astNode      // The node to analyse
     */
    static isBlock(astNode) {
        return ((astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.Block);
    }
    /**
     * Checks if an AST node is a Parameter
     * @param astNode // The AST node
     */
    static isCallExpression(astNode) {
        var _a;
        return (_a = (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.CallExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Returns true when the AST node is a logic door succeeding to a different logic door
     * a && b && c => returns false
     * a && b || c => returns true
     * (a && b) || c => returns false because of the brackets
     * @param astNode      // The node to analyse
     */
    static isDifferentLogicDoor(astNode) {
        if (Ast.isBinary(astNode) && Ast.isLogicDoor(astNode.secondSon)) {
            if (Ast.isBinary(astNode.parent)
                && !Ast.isSameOperatorToken(astNode, astNode.parent)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Checks if an AST node is a IfStatement which is an "else if"
     * @param astNode      // The node to analyse
     */
    static isElseIfStatement(astNode) {
        var _a;
        return ((astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.IfStatement && ((_a = astNode === null || astNode === void 0 ? void 0 : astNode.parent) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.IfStatement);
    }
    /**
     * Checks if an AST node is a Block which is a "else"
     * @param astNode      // The node to analyse
     */
    static isElseStatement(astNode) {
        var _a;
        return (Ast.isBlock(astNode)
            && ((_a = astNode === null || astNode === void 0 ? void 0 : astNode.parent) === null || _a === void 0 ? void 0 : _a.kind) === syntax_kind_enum_1.SyntaxKind.IfStatement
            && (astNode === null || astNode === void 0 ? void 0 : astNode.parent.getSon(2)) === astNode);
    }
    /**
     * Checks if an AST node is a function or a method
     * @param astNode
     */
    static isFunctionOrMethod(astNode) {
        return (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.MethodDeclaration || (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.FunctionDeclaration || false;
    }
    /**
     * Checks if an AST node is a function or a method
     * @param astNode
     */
    static isIdentifier(astNode) {
        return (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.Identifier;
    }
    /**
     * Checks if an AST node is a logic door (ie : || or &&)
     * @param astNode // The AST node to check
     */
    static isLogicDoor(astNode) {
        var _a;
        return (_a = (astNode.kind === syntax_kind_enum_1.SyntaxKind.AmpersandAmpersandToken
            || astNode.kind === syntax_kind_enum_1.SyntaxKind.BarBarToken)) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if an AST node is an index of an array, ie if it's a Node which is the second son of an ELEMENT_ACCESS_EXPRESSION
     * @param astNode      // The node to analyse
     */
    static isCallIdentifier(astNode) {
        return (Ast.isCallExpression(astNode.parent) && Ast.isIdentifier(astNode));
    }
    /**
     * Checks if an AST node is a Parameter
     * @param astNode // The AST node
     */
    static isParam(astNode) {
        var _a;
        return (_a = (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.Parameter) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if an AST node is a PropertyAccessExpression
     * @param astNode // The AST node
     */
    static isPropertyAccessExpression(astNode) {
        var _a;
        return (_a = (astNode === null || astNode === void 0 ? void 0 : astNode.kind) === syntax_kind_enum_1.SyntaxKind.PropertyAccessExpression) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if two AST nodes have the same type
     * @param firstNode   // The first AST node
     * @param secondNode  // The second AST node
     */
    static isSameOperatorToken(firstNode, secondNode) {
        var _a, _b, _c;
        return (_c = ((_a = firstNode === null || firstNode === void 0 ? void 0 : firstNode.secondSon) === null || _a === void 0 ? void 0 : _a.kind) === ((_b = secondNode === null || secondNode === void 0 ? void 0 : secondNode.secondSon) === null || _b === void 0 ? void 0 : _b.kind)) !== null && _c !== void 0 ? _c : false;
    }
}
exports.Ast = Ast;
