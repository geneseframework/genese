import { cstToAst } from '../cst-to-ast';
import { NewExpression } from '../models/new-expression.model';
import { NewExpressionChildren } from '../models/new-expression-children.model';

// @ts-ignore
export function run(cstNode: NewExpression, children: NewExpressionChildren): any {
    const unqualifiedClassInstanceCreationExpression = children.unqualifiedClassInstanceCreationExpression;
    const arrayCreationExpression = children.arrayCreationExpression;
    
    return {
        kind: 'NewExpression',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...unqualifiedClassInstanceCreationExpression?.map(e => cstToAst(e)) ?? []),
            ...[].concat(...arrayCreationExpression?.map(e => cstToAst(e)) ?? [])
        ]
    }     
}
