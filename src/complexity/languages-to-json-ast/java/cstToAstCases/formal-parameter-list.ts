import { cstToAst } from '../cstToAst';
import { FormalParameterList } from '../models/formal-parameter-list.model';
import { FormalParameterListChildren } from '../models/formal-parameter-list-children.model';

// @ts-ignore
export function run(cstNode: FormalParameterList, children: FormalParameterListChildren) {
    const formalParameter = children.formalParameter;

    return [
        ...formalParameter.map(e => cstToAst(e))
    ]

    // return {
    //     kind: 'FormalParameterList',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...formalParameter.map(e => cstToAst(e))
    //     ]
    // };
}
