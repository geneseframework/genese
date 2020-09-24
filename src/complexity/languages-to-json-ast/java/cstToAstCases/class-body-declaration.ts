import { cstToAst } from '../cstToAst';
import { ClassBodyDeclarationElement } from '../models/class-body-declaration-element.model';
import { ClassBodyDeclarationChildren } from '../models/class-body-declaration-children.model';

// @ts-ignore
export function run(cstNode: ClassBodyDeclarationElement, children: ClassBodyDeclarationChildren) {
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
