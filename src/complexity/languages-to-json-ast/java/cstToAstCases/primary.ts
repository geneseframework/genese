import { cstToAst } from '../cstToAst';
import { Primary } from '../models/primary.model';
import { PrimaryChildren } from '../models/primary-children.model';

// @ts-ignore
export function run(cstNode: Primary, children: PrimaryChildren) {
    const primaryPrefix = children.primaryPrefix;
    const primarySuffix = children.primarySuffix;

    return [
        ...[].concat(...primaryPrefix?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...primarySuffix?.map(e => cstToAst(e)) ?? [])
    ]

}
