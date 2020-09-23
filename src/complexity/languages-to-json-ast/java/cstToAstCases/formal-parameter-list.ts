import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const formalParameter = children.formalParameter;

    return {
        kind: 'FormalParameterList',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...formalParameter.map(e => cstToAst(e))
        ]
    };
}
