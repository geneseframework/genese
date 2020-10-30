import { cstToAst } from '../cst-to-ast';
import { TypeNameElement } from '../models/type-name-element.model';
import { TypeNameChildren } from '../models/type-name-children.model';

// @ts-ignore
export function run(cstNode: TypeNameElement, children: TypeNameChildren): any {
    const identifier = children.Identifier;
    
    return [
        ...[].concat(...identifier?.map(e => cstToAst(e)) ?? []),
    ];
}
