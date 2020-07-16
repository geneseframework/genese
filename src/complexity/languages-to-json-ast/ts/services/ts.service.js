"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ts = void 0;
const kind_aliases_1 = require("../const/kind-aliases");
const ts_morph_1 = require("ts-morph");
const language_to_json_ast_1 = require("../../language-to-json-ast");
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
        for (const alias of kind_aliases_1.KindAliases) {
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
    // static getName(node: ts.Node): string {
    //     switch (node.kind) {
    //         case SyntaxKind.ClassDeclaration:
    //         case SyntaxKind.FunctionDeclaration:
    //         case SyntaxKind.MethodDeclaration:
    //         case SyntaxKind.Parameter:
    //             return node['name']?.['escapedText'] ?? '';
    //         case SyntaxKind.Identifier:
    //             return node['escapedText'];
    //         default:
    //             return undefined;
    //     }
    // }
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
    static getType(node, sourceFile) {
        // if (!node.getSymbol()?.getFlags()) {
        //     return undefined;
        // }
        // return ;
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.Identifier:
            case ts_morph_1.SyntaxKind.Parameter:
                let stat = Date.now();
                const a = node.compilerNode.getText(sourceFile);
                language_to_json_ast_1.LanguageToJsonAst.incrementIdentifierDuration(stat, 'getTypeDuration');
                return Ts.getIdentifierType(a);
                // stat = Date.now();
                // const b = a.getApparentType();
                // LanguageToJsonAst.incrementIdentifierDuration(stat, 'getApparentTypeDuration');
                // console.log('BBB', a)
                // throw Error;
                // stat = Date.now();
                // const c = b.getText();
                // LanguageToJsonAst.incrementIdentifierDuration(stat, 'getTextDuration');
                // const zzz = Ts.getIdentifierType(node.getType().getApparentType().getText());
                return;
            default:
                return undefined;
        }
    }
    static getIdentifierType(text) {
        switch (text) {
            case 'Any':
            case 'Boolean':
            case 'Number':
            case 'Object':
            case 'String':
                return text.toLowerCase();
            default:
                return text.match(/=>/) ? 'function' : undefined;
        }
    }
}
exports.Ts = Ts;
