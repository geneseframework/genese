import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const fqnOrRefTypePartCommon = children.fqnOrRefTypePartCommon;

    return [
        ...[].concat(...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? [])
    ]

    // return {
    //     kind: 'FqnOrRefTypePartFirst',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
