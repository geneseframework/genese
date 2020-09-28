import { cstToAst } from '../cstToAst';
import { PrimarySuffix } from '../models/primary-suffix.model';
import { PrimarySuffixChildren } from '../models/primary-suffix-children.model';

// @ts-ignore
export function run(cstNode: PrimarySuffix, children: PrimarySuffixChildren) {
    const methodInvocationSuffix = children.methodInvocationSuffix;

    return [
        ...[].concat(...methodInvocationSuffix?.map(e => cstToAst(e)) ?? [])
    ]

}
