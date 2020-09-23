import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unannType = children.unannType;

    return [
        ...[].concat(...unannType.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'Result',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...unannType.map(e => cstToAst(e)),
    //     ]
    // };
}
