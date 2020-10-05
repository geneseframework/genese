import { cstToAst } from '../cst-to-ast';
import { DoStatement } from '../models/do-statement.model';
import { DoStatementChildren } from '../models/do-statement-children.model';
import { ClassOrInterfaceTypeToInstanciateChildren } from '../models/class-or-interface-type-to-instantiate-children.model';
import { ClassOrInterfaceTypeToInstanciate } from '../models/class-or-interface-type-to-instantiate.model';
import { Infos } from '../models/infos.model';

// @ts-ignore
export function run(cstNode: ClassOrInterfaceTypeToInstanciate, children: ClassOrInterfaceTypeToInstanciateChildren): any {
    const identifier = children.Identifier;

    return [...identifier.map(e => cstToAst(e, 'identifier'))]
}
