import { LambdaBody } from '../models/lambda-body.model';
import { LambdaBodyChildren } from '../models/lambda-body-children.model';
import { cstToAst } from '../cst-to-ast';

// @ts-ignore
export function run(cstNode: LambdaBody, children: LambdaBodyChildren) {
    const block = children.block;
    return {
        kind: 'ArrowFunction',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,

        children: [
            ...[].concat(...block.map(e => cstToAst(e)) ?? [])
        ]
    }

}
