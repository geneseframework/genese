import { cstToAst } from '../cstToAst';
import { MethodInvocationSuffixChildren } from '../models/method-invocation-suffix-children.model';
import { MethodInvocationSuffix } from '../models/method-invocation-suffix.model';

// @ts-ignore
export function run(cstNode: MethodInvocationSuffix, children: MethodInvocationSuffixChildren) {
    const argumentList = children.argumentList;

    return [
        ...[].concat(...argumentList?.map(e => cstToAst(e)) ?? []),
    ]
}
