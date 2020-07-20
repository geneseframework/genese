"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
const globals_const_1 = require("../../globals.const");
const ts_morph_1 = require("ts-morph");
/**
 * Service for operations on Node elements (ts-morph nodes)
 */
class Ts {
    /**
     * Returns the SyntaxKind of an AST node or its alias if exists
     * @param node
     */
    static getKindAlias(node) {
        let kind = node.getKindName();
        for (const alias of globals_const_1.KindAliases) {
            if (alias.aliases.includes(kind)) {
                kind = alias.name;
                break;
            }
        }
        return kind;
    }
    /**
     * Gets the name of a Node
     * @param node // The AST node
     */
    static getName(node) {
        var _a, _b;
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.ClassDeclaration:
            case ts_morph_1.SyntaxKind.FunctionDeclaration:
            case ts_morph_1.SyntaxKind.MethodDeclaration:
            case ts_morph_1.SyntaxKind.Parameter:
                return (_b = (_a = node.compilerNode['name']) === null || _a === void 0 ? void 0 : _a['escapedText']) !== null && _b !== void 0 ? _b : '';
            case ts_morph_1.SyntaxKind.Identifier:
                return node.compilerNode['escapedText'];
            default:
                return undefined;
        }
    }
    /**
     * Checks if a node is a call to a function or method
     * Example : a.slice(1)
     * @param node      // The node to check
     */
    static isFunctionCall(node) {
        var _a, _b;
        return ((_b = (_a = node === null || node === void 0 ? void 0 : node.getParent()) === null || _a === void 0 ? void 0 : _a.getParent()) === null || _b === void 0 ? void 0 : _b.getKind()) === ts_morph_1.SyntaxKind.CallExpression && Ts.isSecondSon(node);
    }
    /**
     * Checks is a given node is the second son of its parent
     * @param node      // The node to check
     */
    static isSecondSon(node) {
        if (!(node === null || node === void 0 ? void 0 : node.getParent())) {
            return false;
        }
        return (node === null || node === void 0 ? void 0 : node.getChildIndex()) === 2;
    }
}
exports.Ts = Ts;
