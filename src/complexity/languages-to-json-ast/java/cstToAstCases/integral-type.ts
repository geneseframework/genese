import { cstToAst } from '../cst-to-ast';
import { IntegralType } from '../models/integral-type.model';
import { IntegralTypeChildren } from '../models/integral-type-children.model';

// @ts-ignore
export function run(cstNode: IntegralType, children: IntegralTypeChildren): any {
    const int = children.Int;

    return [
        ...int.map(e => cstToAst(e, 'int'))
    ]
}
