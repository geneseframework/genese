import { SyntaxKind } from '../../core/enum/syntax-kind.enum';

export function cstToAst(cstNode, kind = undefined) {
    const children = cstNode.children;
    try {
        return require(`./cstToAstCases/${toKebabCase(cstNode.name || kind)}`).run(cstNode, children);
    } catch (e) {
        console.log('error', e);
        // throw new Error(
        //     `CST case handler not implemented for CST node <${cstNode.name || kind}>, require <./cstToAstCases/${toKebabCase(cstNode.name || kind)}>`
        // );
    }
}

function toKebabCase(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function getAlias(kind): String {
    switch (kind) {
        case 'ReturnStatement':
            return 'Keyword';
        case 'FormalParameter':
            return 'Parameter'
        default:
            return kind;
    }
}

export function getBinaryOperatorName(operator): String {
    switch (operator) {
        case '>':
            return SyntaxKind.GreaterThanToken;
        case '>=':
            return SyntaxKind.GreaterThanEqualsToken;
        case '<':
            return SyntaxKind.LessThanToken;
        case '<=':
            return SyntaxKind.LessThanEqualsToken;
        case '+':
            return SyntaxKind.PlusPlusToken;
        case '-':
            return SyntaxKind.MinusToken;
        case '*':
            return SyntaxKind.AsteriskToken;
        case '==':
            return SyntaxKind.EqualsEqualsToken;
        default:
            return operator;
    }
}
