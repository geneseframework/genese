import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const unannType = children.unannType;
    const variableDeclaratorId = children.variableDeclaratorId;

    return [
        ...[].concat(...unannType.map(e => cstToAst(e))),
        ...[].concat(...variableDeclaratorId.map(e => cstToAst(e)))
    ]

    // return {
    //     kind: 'VariableParaRegularParameter',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...unannType.map(e => cstToAst(e))),
    //         ...[].concat(...variableDeclaratorId.map(e => cstToAst(e)))
    //     ]
    // };
}
