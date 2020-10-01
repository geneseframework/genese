import { cstToAst } from '../cst-to-ast';
import { TypeArgument } from '../models/type-argument.model';
import { TypeArgumentChildren } from '../models/type-argument-children.model';

// @ts-ignore
export function run(cstNode: TypeArgument, children: TypeArgumentChildren): any {
    const referenceType = children.referenceType;

    return [
        ...referenceType?.map(e => cstToAst(e)) ?? [],
    ];
}
