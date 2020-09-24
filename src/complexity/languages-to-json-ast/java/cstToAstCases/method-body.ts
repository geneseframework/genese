import { cstToAst } from '../cstToAst';
import { MethodBody } from '../models/method-body.model';
import { MethodBodyChildren } from '../models/method-body-children.model';

// @ts-ignore
export function run(cstNode: MethodBody, children: MethodBodyChildren) {
    const block = children.block

    return [
        ...block.map(e => cstToAst(e)),
    ]

    // return {
    //     kind: 'MethodBody',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...block.map(e => cstToAst(e)),
    //     ]
    // };
}
