import { cstToAst } from '../cst-to-ast';
import { NewExpression } from '../models/new-expression.model';
import { NewExpressionChildren } from '../models/new-expression-children.model';

// @ts-ignore
export function run(cstNode: NewExpression, children: NewExpressionChildren): any {
    const unqualifiedClassInstanceCreationExpression = children.unqualifiedClassInstanceCreationExpression;

    return [
        ...[].concat(...unqualifiedClassInstanceCreationExpression?.map(e => cstToAst(e)) ?? [])
    ];
}
