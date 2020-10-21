import { cstToAst } from '../cst-to-ast';
import { DimExprs } from '../models/dim-exprs.model';
import { DimExprsChildren } from '../models/dim-exprs-children.model';

// @ts-ignore
export function run(cstNode: DimExprs, children: DimExprsChildren): any {
    const expression = children.expression;

    return [
            ...[].concat(...expression.map(e => cstToAst(e)) ?? [])
    ];
}
