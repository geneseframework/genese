import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const fqnOrRefTypePartFirst = children.fqnOrRefTypePartFirst;

    return [
        ...[].concat(...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? [])
    ]

    // return {
    //     kind: 'FqnOrRefType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
