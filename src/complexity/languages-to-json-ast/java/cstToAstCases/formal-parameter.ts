import { cstToAst, getAlias } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const variableParaRegularParameter = children.variableParaRegularParameter;

    return {
        kind: getAlias('FormalParameter'),
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...variableParaRegularParameter.map(e => cstToAst(e)))
        ]
    };
}
