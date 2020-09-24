import { cstToAst } from '../cstToAst';
import { Expression } from '../models/expression.model';
import { ExpressionChildren } from '../models/expression-children.model';


// @ts-ignore
export function run(cstNode: Expression, children: ExpressionChildren) {
    const ternaryExpression = children.ternaryExpression;

    return [
        ...[].concat(...ternaryExpressions.map(e => cstToAst(e)) ?? [])
    ];
}
