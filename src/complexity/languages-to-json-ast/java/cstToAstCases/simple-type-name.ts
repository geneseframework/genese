import { cstToAst } from '../cst-to-ast';
import { ConstructorDeclaratorChildren } from '../models/constructor-declarator-children.model';
import { ConstructorDeclarator } from '../models/constructor-declarator.model';

// @ts-ignore
export function run(cstNode: any, children: any): any {
    const identifier = children.Identifier;

    return [
        ...[].concat(...identifier?.map(e => cstToAst(e, 'identifier')) ?? []),
    ];
}
