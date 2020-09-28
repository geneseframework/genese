import { cstToAst } from '../cstToAst';
import { Expression } from '../models/expression.model';
import { ExpressionChildren } from '../models/expression-children.model';


// @ts-ignore
export function run(cstNode: Expression, children: ExpressionChildren) {
    const ternaryExpressions = children.ternaryExpression;
    const lambdaExpression = children.lambdaExpression;
    
    return [
        ...[].concat(...ternaryExpressions?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...lambdaExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
