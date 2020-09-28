import { cstToAst } from '../cstToAst';
import { LambdaExpression } from '../models/lambda-expression.model';
import { LambdaExpressionChildren } from '../models/lambda-expression-children.model';

// @ts-ignore
export function run(cstNode: LambdaExpression, children: LambdaExpressionChildren) {
    const lambdaParameters = children.lambdaParameters;
    const lambdaBody = children.lambdaBody;

    return {
        kind: 'ArrowFunction',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...lambdaBody.map(e => cstToAst(e)) ?? []),
            ...[].concat(...lambdaParameters.map(e => cstToAst(e)) ?? [])
        ]
    } 
    
}
