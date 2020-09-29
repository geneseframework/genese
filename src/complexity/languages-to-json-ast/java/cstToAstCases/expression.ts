import { cstToAst } from '../cst-to-ast';
import { Expression } from '../models/expression.model';
import { ExpressionChildren } from '../models/expression-children.model';


// @ts-ignore
export function run(cstNode: Expression, children: ExpressionChildren): any {
    const ternaryExpressions = children.ternaryExpression;

    return [
        ...[].concat(...ternaryExpressions.map(e => cstToAst(e)) ?? [])
    ];
}
