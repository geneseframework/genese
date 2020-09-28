import { SyntaxKind } from '../../core/enum/syntax-kind.enum';

export function cstToAst(cstNode, kind = undefined): any {
    const children = cstNode.children;
    try {
        return require(`./cstToAstCases/${toKebabCase(cstNode.name || kind)}`).run(cstNode, children);
    } catch (e) {
        console.log('error', e);
    }
}

function toKebabCase(text: string): string {
    if (text === undefined) return '';
    return text.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function getBinaryOperatorName(operator: string): string {
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
            return SyntaxKind.PlusToken;
        case '-':
            return SyntaxKind.MinusToken;
        case '*':
            return SyntaxKind.AsteriskToken;
        case '==':
            return SyntaxKind.EqualsEqualsToken;
        case '=':
            return SyntaxKind.EqualsToken;
        case '&&':
            return SyntaxKind.AmpersandAmpersandToken
        case '||':
            return SyntaxKind.BarBarToken
        default:
            return operator;
    }
}
