import { cstToAst } from '../cst-to-ast';
import { ConstructorDeclarationElementChildren } from '../models/constructor-declaration-children.model';
import { ConstructorDeclarationElement } from '../models/constructor-declaration.model';

export function run(cstNode: ConstructorDeclarationElement, children: ConstructorDeclarationElementChildren): any {
    const constructorBody = children.constructorBody
    const constructorDeclarator = children.constructorDeclarator

    return {
        kind: 'MethodDeclaration',
        start: cstNode.location.startOffset,
        end: cstNode.location.endOffset,
        pos: cstNode.location.startOffset,
        children: [
            ...[].concat(...constructorBody.map(e => cstToAst(e))),
            ...[].concat(...constructorDeclarator.map(e => cstToAst(e)))
        ]
    };
}
