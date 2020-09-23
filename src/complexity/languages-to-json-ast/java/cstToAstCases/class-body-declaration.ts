import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const classMemberDeclaration = children.classMemberDeclaration;

    return [
        ...[].concat(...classMemberDeclaration.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'ClassBodyDeclaration',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...classMemberDeclaration.map(e => cstToAst(e))),
    //     ]
    // };
}
