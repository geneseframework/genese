import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unannPrimitiveType = children.unannPrimitiveType;

    return [
        ...[].concat(...unannPrimitiveType.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'UnannType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...unannPrimitiveType.map(e => cstToAst(e))),
    //     ]
    // };
}
