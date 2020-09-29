import { cstToAst } from '../cst-to-ast';
import { UnannType } from '../models/unann-type.model';
import { UnannTypeChildren } from '../models/unann-type-children.model';

// @ts-ignore
export function run(cstNode: UnannType, children: UnannTypeChildren): any {
    const unannPrimitiveType = children.unannPrimitiveType;

    return [
        ...[].concat(...unannPrimitiveType?.map(e => cstToAst(e)) ?? []),
    ]
}
