import { cstToAst } from '../cst-to-ast';
import { Expression } from '../models/expression.model';
import { ExpressionChildren } from '../models/expression-children.model';


// @ts-ignore
export function run(cstNode: Expression, children: ExpressionChildren): any {
    const ternaryExpressions = children.ternaryExpression;
    const lambdaExpression = children.lambdaExpression;
    const newExpression = children.NewExpression;

    return [
        ...[].concat(...ternaryExpressions?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...lambdaExpression?.map(e => cstToAst(e)) ?? []),
        // ...[].concat(...newExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
