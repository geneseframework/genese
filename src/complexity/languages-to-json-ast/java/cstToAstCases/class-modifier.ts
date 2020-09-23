import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const Public = children.Public;

    return {
        kind: 'ClassModifier',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...Public.map(e => cstToAst(e, 'public')),
        ]
    };
}
