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
     * Returns the type of identifiers or parameters
     * @param node
     */
    static getType(node) {
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.Identifier:
            case ts_morph_1.SyntaxKind.Parameter:
                // console.log('IDENTIFIER ', node.getKindName(), node.compilerNode.getText())
                return Ts.getIdentifierType(node.getType().getApparentType().getText());
            default:
                return undefined;
        }
    }
    /**
     * Returns the IdentifierType associated to a given string coming from compilerNode.getText()
     * @param compilerNodeText
     */
    static getIdentifierType(compilerNodeText) {
        switch (compilerNodeText) {
            case 'Any':
            case 'Boolean':
            case 'Number':
            case 'Object':
            case 'String':
                return compilerNodeText.toLowerCase();
            default:
                return compilerNodeText.match(/=>/) ? 'function' : undefined;
        }
    }
}
exports.Ts = Ts;
