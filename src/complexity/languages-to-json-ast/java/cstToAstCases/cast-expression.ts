import { cstToAst } from '../cst-to-ast';
import { CastExpression } from '../models/cast-expression.model';
import { CastExpressionChildren } from '../models/cast-expression-children.model';

// @ts-ignore
export function run(cstNode: CastExpression, children: CastExpressionChildren): any {
    const primitiveCastExpression = children.primitiveCastExpression;

    return [
        ...[].concat(...primitiveCastExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
