import { cstToAst } from '../cst-to-ast';
import { UnannClassType } from '../models/unann-class-type.model';
import { UnannClassTypeChildren } from '../models/unann-class-type-children.model';

// @ts-ignore
export function run(cstNode: UnannClassType, children: UnannClassTypeChildren): any {
    const identifier = children.Identifier;
    const typeArguments = children.typeArguments;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? [],
        ...[].concat(...typeArguments?.map(e => cstToAst(e)) ?? [])
    ];
}
