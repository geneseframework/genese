import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const methodDeclaration = children.methodDeclaration;

    return [
        ...methodDeclaration.map(e => cstToAst(e)),
    ]

    // return {
    //     kind: 'ClassMemberDeclaration',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...methodDeclaration.map(e => cstToAst(e)),
    //     ]
    // };
}
