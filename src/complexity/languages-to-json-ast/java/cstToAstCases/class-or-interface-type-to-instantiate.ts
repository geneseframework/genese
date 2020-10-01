import { cstToAst } from '../cst-to-ast';
import { ClassOrInterfaceTypeToInstantiate } from '../models/class-or-interface-type-to-instantiate.model';
import { ClassOrInterfaceTypeToInstantiateChildren } from '../models/class-or-interface-type-to-instantiate-children.model';

// @ts-ignore
export function run(cstNode: ClassOrInterfaceTypeToInstantiate, children: ClassOrInterfaceTypeToInstantiateChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier?.map(e => cstToAst(e)) ?? []
    ];
}
