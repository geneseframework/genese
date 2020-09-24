import { cstToAst } from '../cstToAst';
import { ClassDeclarationElement } from '../models/class-declaration-element.model';
import { ClassDeclarationChildren } from '../models/class-declaration-children.model';

// @ts-ignore
export function run(cstNode: ClassDeclarationElement, children: ClassDeclarationChildren) {
    const classModifier = children.classModifier;
    const normalClassDeclaration = children.normalClassDeclaration;

    return {
        kind: 'ClassDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            // ...classModifier.map(e => cstToAst(e)),
            ...[].concat(...normalClassDeclaration.map(e => cstToAst(e))),
        ]
    };
}
