import { cstToAst } from '../cstToAst';
import { NormalClassDeclarationElement } from '../models/normal-class-declaration-element.model';
import { NormalClassDeclarationChildren } from '../models/normal-class-declaration-children.model';

// @ts-ignore
export function run(cstNode: NormalClassDeclarationElement, children: NormalClassDeclarationChildren) {
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
