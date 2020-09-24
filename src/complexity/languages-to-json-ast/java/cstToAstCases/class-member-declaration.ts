import { cstToAst } from '../cstToAst';
import { ClassMemberDeclarationElement } from '../models/class-member-declaration-element.model';
import { ClassMemberDeclarationChildren } from '../models/class-member-declaration-children.model';

// @ts-ignore
export function run(cstNode: ClassMemberDeclarationElement, children: ClassMemberDeclarationChildren) {
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
