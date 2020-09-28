import { cstToAst } from '../cst-to-ast';
import { PrimarySuffix } from '../models/primary-suffix.model';
import { PrimarySuffixChildren } from '../models/primary-suffix-children.model';

// @ts-ignore
export function run(cstNode: PrimarySuffix, children: PrimarySuffixChildren): any {
    const identifier = children.Identifier;
    const methodInvocationSuffix = children.methodInvocationSuffix;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? [],
        ...[].concat(...methodInvocationSuffix?.map(e => cstToAst(e, 'methodInvocationSuffix')) ?? [])
    ];
}
