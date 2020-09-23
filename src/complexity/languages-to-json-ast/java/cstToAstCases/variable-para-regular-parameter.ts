import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unannType = children.unannType;
    const variableDeclaratorId = children.variableDeclaratorId;

    return {
        kind: 'VariableParaRegularParameter',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        children: [
            ...unannType.map(e => cstToAst(e)),
            ...variableDeclaratorId.map(e => cstToAst(e))
        ]
    };
}
