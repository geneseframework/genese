import { cstToAst } from '../cstToAst';
import { VariableParaRegularParameter } from '../models/variable-para-regular-parameter.model';
import { VariableParaRegularParameterChildren } from '../models/variable-para-regular-parameter-children.model';

// @ts-ignore
export function run(cstNode: VariableParaRegularParameter, children: VariableParaRegularParameterChildren) {
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
