import { cstToAst } from '../cstToAst';
import { MethodDeclarator } from '../models/method-declarator.model';
import { MethodDeclaratorChildren } from '../models/method-declarator-children.model';

// @ts-ignore
export function run(cstNode: MethodDeclarator, children: MethodDeclaratorChildren) {
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
