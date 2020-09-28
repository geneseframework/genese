import { cstToAst } from '../cstToAst';
import { PrimarySuffix } from '../models/primary-suffix.model';
import { PrimarySuffixChildren } from '../models/primary-suffix-children.model';

// @ts-ignore
export function run(cstNode: PrimarySuffix, children: PrimarySuffixChildren) {
    const identifier = children.Identifier;
    const methodInvocationSuffix = children.methodInvocationSuffix;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? [],
        ...[].concat(...methodInvocationSuffix?.map(e => cstToAst(e, 'methodInvocationSuffix')) ?? [])
    ];

    // return {
    //     kind: 'PrimarySuffix',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    //     ]
    // };
}
