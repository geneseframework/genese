import { cstToAst } from '../cst-to-ast';
import { FloatingPointType } from '../models/floating-point-type.model';
import { FloatingPointTypeChildren } from '../models/floating-point-type-children.model';

// @ts-ignore
export function run(cstNode: FloatingPointType, children: FloatingPointTypeChildren): any {
    const Double = children.Double;

    return [
        ...[].concat(Double?.map(e => cstToAst(e, 'double')) ?? [])
    ];
}
