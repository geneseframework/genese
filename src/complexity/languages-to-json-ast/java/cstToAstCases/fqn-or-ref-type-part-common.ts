import { cstToAst } from '../cst-to-ast';
import { FqnOrRefTypePartCommon } from '../models/fqn-or-ref-type-part-common.model';
import { FqnOrRefTypePartCommonChildren } from '../models/fqn-or-ref-type-part-common-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefTypePartCommon, children: FqnOrRefTypePartCommonChildren): any {
    const identifier = children.Identifier;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    ]
}
