import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
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
