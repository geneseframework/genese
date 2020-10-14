import { cstToAst } from '../cst-to-ast';
import { TernaryExpression } from '../models/ternary-expression.model';
import { TernaryExpressionChildren } from '../models/ternary-expression-children.model';

// @ts-ignore
export function run(cstNode: TernaryExpression, children: TernaryExpressionChildren): any {
    const binaryExpressions = children.binaryExpression;
    const expression = children.expression;

    return [
        ...[].concat(...binaryExpressions?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ];
}
