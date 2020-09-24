import { cstToAst } from '../cstToAst';
import { TernaryExpression } from '../models/ternary-expression.model';
import { TernaryExpressionChildren } from '../models/ternary-expression-children.model';

// @ts-ignore
export function run(cstNode: TernaryExpression, children: TernaryExpressionChildren) {
    const binaryExpressions = children.binaryExpression;

    return [
        ...[].concat(...binaryExpressions.map(e => cstToAst(e)))
    ];
}
