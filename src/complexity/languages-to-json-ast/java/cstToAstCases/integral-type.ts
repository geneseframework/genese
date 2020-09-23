import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const int = children.Int;

    return {
        kind: 'IntegralType',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            int.map(e => cstToAst(e, 'int')),
        ]
    };
}
