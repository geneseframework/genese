import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unannPrimitiveType = children.unannPrimitiveType;

    return {
        kind: 'UnannType',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...unannPrimitiveType.map(e => cstToAst(e)),
        ]
    };
}
