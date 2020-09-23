"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinaryOperatorName = exports.getAlias = exports.cstToAst = void 0;
const syntax_kind_enum_1 = require("../../core/enum/syntax-kind.enum");
function cstToAst(cstNode, kind = undefined) {
    const children = cstNode.children;
    try {
        return require(`./cstToAstCases/${toKebabCase(cstNode.name || kind)}`).run(cstNode, children);
    }
    catch (e) {
        console.log('error', e);
        // throw new Error(
        //     `CST case handler not implemented for CST node <${cstNode.name || kind}>, require <./cstToAstCases/${toKebabCase(cstNode.name || kind)}>`
        // );
    }
}
exports.cstToAst = cstToAst;
function toKebabCase(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
function getAlias(kind) {
    switch (kind) {
        case 'ReturnStatement':
            return 'Keyword';
        case 'FormalParameter':
            return 'Parameter';
        default:
            return kind;
    }
}
exports.getAlias = getAlias;
function getBinaryOperatorName(operator) {
    switch (operator) {
        case '>':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanToken;
        case '>=':
            return syntax_kind_enum_1.SyntaxKind.GreaterThanEqualsToken;
        case '<':
            return syntax_kind_enum_1.SyntaxKind.LessThanToken;
        case '<=':
            return syntax_kind_enum_1.SyntaxKind.LessThanEqualsToken;
        case '+':
            return syntax_kind_enum_1.SyntaxKind.PlusToken;
        case '-':
            return syntax_kind_enum_1.SyntaxKind.MinusToken;
        case '*':
            return syntax_kind_enum_1.SyntaxKind.AsteriskToken;
        case '==':
            return syntax_kind_enum_1.SyntaxKind.EqualsEqualsToken;
        default:
            return operator;
    }
}
exports.getBinaryOperatorName = getBinaryOperatorName;
