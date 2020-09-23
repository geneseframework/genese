import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const integralType = children.integralType;

    return {
        kind: 'NumericType',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...integralType.map(e => cstToAst(e)),
        ]
    };
}
