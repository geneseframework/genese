import { cstToAst } from '../cst-to-ast';
import { ConstructorBodyChildren } from '../models/constructor-body-children.model';
import { ConstructorBody } from '../models/constructor-body.model';
import { ConstructorDeclaratorChildren } from '../models/constructor-declarator-children.model';
import { ConstructorDeclarator } from '../models/constructor-declarator.model';

// @ts-ignore
export function run(cstNode: ConstructorDeclarator, children: ConstructorDeclaratorChildren): any {
    const formalParameterList = children.formalParameterList

    return [
        ...[].concat(...formalParameterList.map(e => cstToAst(e)))
    ];
}
