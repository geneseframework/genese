import { cstToAst } from '../cst-to-ast';
import { PrimaryPrefix } from '../models/primary-prefix.model';
import { PrimaryPrefixChildren } from '../models/primary-prefix-children.model';

// @ts-ignore
export function run(cstNode: PrimaryPrefix, children: PrimaryPrefixChildren): any {
    const parenthesisExpression = children.parenthesisExpression;
    const fqnOrRefType = children.fqnOrRefType;
    const literal = children.literal;
    const this_ = children.This;

    return [
        ...[].concat(...parenthesisExpression?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...fqnOrRefType?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...literal?.map(e => cstToAst(e)) ?? []),
        ...this_?.map(e => cstToAst(e, 'this')) ?? []
    ]
}
