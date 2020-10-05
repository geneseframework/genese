import { cstToAst } from '../cst-to-ast';
import { TypeArgumentsOrDiamondChildren } from '../models/type-arguments-or-diamond-children.model';
import { TypeArgumentsOrDiamond } from '../models/type-arguments-or-diamond.model';

// @ts-ignore
export function run(cstNode: TypeArgumentsOrDiamond, children: TypeArgumentsOrDiamondChildren): any {
    const typeArguments = children.typeArguments;

    return [
        ...[].concat(...typeArguments?.map(e => cstToAst(e)) ?? [])
    ];
}
