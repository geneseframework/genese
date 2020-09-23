import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const variableParaRegularParameter = children.variableParaRegularParameter;

    return {
        kind: 'VariableParaRegularParameter',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...variableParaRegularParameter.map(e => cstToAst(e))
        ]
    };
}
