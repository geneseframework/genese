import { SyntaxKind } from './core/enum/syntax-kind.enum';


export function toAst(cst, kind = undefined) {
    const children = cst.children;
    switch (cst.name || kind) {
        case 'ifStatement':
            const expressions = children.expression;
            const statements = children.statement;

            return {
                kind: 'IfStatement',
                start: cst.location.startOffset,
                end: cst.location.endOffset,
                children: [
                    ...[].concat(...expressions.map(e => toAst(e))),
                    ...[].concat(...statements.map(e => toAst(e)))
                ]
            };
        case 'expression':
            const ternaryExpressions = children.ternaryExpression;

            return [...[].concat(...ternaryExpressions.map(e => toAst(e)))];
        // return {
        //     kind: 'Expression',
        //     children: [
        //         ...[].concat(...ternaryExpressions.map(e => toAst(e)))
        //     ]
        // };
        case 'ternaryExpression':
            const binaryExpressions = children.binaryExpression;

            return binaryExpressions.map(e => toAst(e));
        // return {
        //     kind: 'TernaryExpression',
        //     children: [
        //         ...binaryExpressions.map(e => toAst(e))
        //     ]
        // };
        case 'binaryExpression':
            const unaryExpressions = children.unaryExpression;
            const binaryOperator = children.BinaryOperator?.[0];

            const unaryExpressionsAst = unaryExpressions.map(e => toAst(e));

            if (binaryOperator) {
                return {
                    kind: 'BinaryExpression',
                    start: cst.location.startOffset,
                    end: cst.location.endOffset,
                    children: [
                        unaryExpressionsAst[0],
                        {
                            kind: getBinaryOperatorName(binaryOperator.image),
                            start: binaryOperator.startOffset,
                            end: binaryOperator.endOffset,

                        },
                        unaryExpressionsAst[1]
                    ]
                };
            } else {
                return unaryExpressionsAst[0];
            }
        case 'unaryExpression':
            const unaryPrefixOperator = children.UnaryPrefixOperator;
            const identifier = children.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0];

            if (unaryPrefixOperator) {
                const unaryPrefixOperatorAst = toAst(unaryPrefixOperator, 'unaryPrefixOperator');
                unaryPrefixOperatorAst.children.push(toAst(identifier, 'identifier'));
                return unaryPrefixOperatorAst
            } else {
                return toAst(identifier, 'identifier');
            }
        // return {
        //     kind: 'UnaryExpression',
        //     children: [
        //         toAst(identifier, 'identifier')
        //     ]
        // };
        case 'statement':
            return [
                ...[].concat(...children.statementWithoutTrailingSubstatement?.map(e => toAst(e)) ?? [])
            ];
        // return {
        //     kind: 'Statement',
        //     children: [
        //         ...[].concat(...children.statementWithoutTrailingSubstatement?.map(e => toAst(e)) ?? [])
        //     ]
        // };
        case 'statementWithoutTrailingSubstatement':
            return [
                ...children.block?.map(e => toAst(e)) ?? [],
                ...children.returnStatement?.map(e => toAst(e)) ?? []
            ];
        // return {
        //     kind: 'StatementWithoutTrailingSubstatement',
        //     children: [
        //         ...children.block?.map(e => toAst(e)) ?? [],
        //         ...children.returnStatement?.map(e => toAst(e)) ?? []
        //     ]
        // };
        case 'block':
            return {
                kind: 'Block',
                start: cst.location.startOffset,
                end: cst.location.endOffset,
                children: [
                    ...[].concat(...children.blockStatements?.map(e => toAst(e)) ?? [])
                ]
            };
        case 'blockStatements':
            return [
                ...[].concat(...children.blockStatement?.map(e => toAst(e)) ?? [])
            ];
        // return {
        //     kind: 'BlockStatements',
        //     children: [
        //         ...[].concat(...children.blockStatement?.map(e => toAst(e)) ?? [])
        //     ]
        // };
        case 'blockStatement':
            return children.statement?.map(e => toAst(e)) ?? [];
        // return {
        //     kind: 'BlockStatement',
        //     children: [
        //         ...children.statement?.map(e => toAst(e)) ?? []
        //     ]
        // };
        case 'returnStatement':
            return {
                kind: getAlias('ReturnStatement'),
                start: cst.location.startOffset,
                end: cst.location.endOffset,
                children: [
                    ...[].concat(...children.expression?.map(e => toAst(e)) ?? [])
                ]
            };
        case 'identifier':
            return {
                kind: 'Identifier',
                start: cst.startOffset,
                end: cst.endOffset,
                name: cst.image
            };
        case 'unaryPrefixOperator':
            return {
                kind: 'PrefixUnaryExpression',
                start: cst.startOffset,
                end: cst.endOffset,
                children: []
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
            return SyntaxKind.AsteriskToken;
        default:
            return operator;
    }
}
