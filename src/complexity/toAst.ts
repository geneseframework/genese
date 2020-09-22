import { SyntaxKind } from './core/enum/syntax-kind.enum';


export function toAst(cst, kind = undefined) {
    const children = cst.children;
    switch (cst.name || kind) {
        case 'ifStatement':
            const expressions = children.expression;
            const statements = children.statement;

            return {
                kind: 'IfStatement',
                children: [
                    ...expressions.map(e => toAst(e)),
                    ...statements.map(e => toAst(e))
                ]
            };
        case 'expression':
            const ternaryExpressions = children.ternaryExpression;

            return {
                kind: 'Expression',
                children: [
                    ...ternaryExpressions.map(e => toAst(e))
                ]
            };
        case 'ternaryExpression':
            const binaryExpressions = children.binaryExpression;

            return {
                kind: 'TernaryExpression',
                children: [
                    ...binaryExpressions.map(e => toAst(e))
                ]
            };
        case 'binaryExpression':
            const unaryExpressions = children.unaryExpression;
            const binaryOperator = children.BinaryOperator[0];

            const unaryExpressionsAst = unaryExpressions.map(e => toAst(e));

            return {
                kind: 'BinaryExpression',
                children: [
                    unaryExpressionsAst[0],
                    {
                        kind: getBinaryOperatorName(binaryOperator.image),
                    },
                    unaryExpressionsAst[1]
                ]
            };
        case 'unaryExpression':
            const identifier = children.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0];

            return {
                kind: 'UnaryExpression',
                children: [
                    toAst(identifier, 'identifier')
                ]
            };
        case 'statement':
            return {
                kind: 'Statement',
                children: [
                    ...children.statementWithoutTrailingSubstatement?.map(e => toAst(e)) ?? []
                ]
            };
        case 'statementWithoutTrailingSubstatement':
            return {
                kind: 'StatementWithoutTrailingSubstatement',
                children: [
                    ...children.block?.map(e => toAst(e)) ?? [],
                    ...children.returnStatement?.map(e => toAst(e)) ?? []
                ]
            };
        case 'block':
            return {
                kind: 'Block',
                children: [
                    ...children.blockStatements?.map(e => toAst(e)) ?? []
                ]
            };
        case 'blockStatements':
            return {
                kind: 'BlockStatements',
                children: [
                    ...children.blockStatement?.map(e => toAst(e)) ?? []
                ]
            };
        case 'blockStatement':
            return {
                kind: 'BlockStatement',
                children: [
                    ...children.statement?.map(e => toAst(e)) ?? []
                ]
            };
        case 'returnStatement':
            return {
                kind: getAlias('ReturnStatement'),
                children: [
                    ...children.expression?.map(e => toAst(e)) ?? []
                ]
            };
        case 'identifier':
            return {
                kind: 'Identifier',
                name: cst.image
            };
        default:
            throw new Error(
                `CST case handler not implemented for CST node <${cst.name}>`
            );
    }
}

function getAlias(kind): String {
    switch (kind) {
        case 'ReturnStatement':
            return 'Keyword';
        default:
            return kind;
    }
}

function getBinaryOperatorName(operator): String {
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
            return SyntaxKind.AsteriskToken
        default:
            return operator;
    }
}
