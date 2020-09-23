import { cstToAst } from '../cstToAst';

// @ts-ignore
export function run(cstNode, children) {
    const typeIdentifier = children.typeIdentifier;
    const classBody = children.classBody;

    return [
        ...[].concat(...typeIdentifier.map(e => cstToAst(e))),
        ...[].concat(...classBody.map(e => cstToAst(e))),
    ]

    // return {
    //     kind: 'NormalClassDeclaration',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...[].concat(...typeIdentifier.map(e => cstToAst(e))),
    //         ...[].concat(...classBody.map(e => cstToAst(e))),
    //     ]
    // };
}
