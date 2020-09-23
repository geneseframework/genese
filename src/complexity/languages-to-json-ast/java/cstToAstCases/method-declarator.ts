import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const identifier = children.Identifier;
    const formalParameterList = children.formalParameterList;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier')),
        ...[].concat(...formalParameterList.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'MethodDeclarator',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...identifier.map(e => cstToAst(e, 'identifier')),
    //         ...[].concat(...formalParameterList.map(e => cstToAst(e))),
    //     ]
    // };
}
