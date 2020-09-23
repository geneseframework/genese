import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const Double = children.Double;

    return [
        ...Double.map(e => cstToAst(e, 'double'))
    ]

    // return {
    //     kind: 'IntegralType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...int.map(e => cstToAst(e, 'int')),
    //     ]
    // };
}
