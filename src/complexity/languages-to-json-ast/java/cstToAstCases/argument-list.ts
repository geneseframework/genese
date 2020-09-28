import { cstToAst } from '../cstToAst';
import { ArgumentList } from '../models/argument-list.model';
import { ArgumentListChildren } from '../models/argument-list-children.model';

// @ts-ignore
export function run(cstNode: ArgumentList, children: ArgumentListChildren) {
    const expression = children.expression;

    return [
        ...[].concat(...expression?.map(e => cstToAst(e)) ?? [])
    ]
}
