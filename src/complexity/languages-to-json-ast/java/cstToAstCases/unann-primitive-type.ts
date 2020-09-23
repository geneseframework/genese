import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const numericType = children.numericType;

    return [
        ...[].concat(...numericType.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'UnannPrimitiveType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...numericType.map(e => cstToAst(e))),
    //     ]
    // };
}
