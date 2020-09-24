import { cstToAst } from '../cstToAst';
import { FqnOrRefType } from '../models/fqn-or-ref-type.model';
import { FqnOrRefTypeChildren } from '../models/fqn-or-ref-type-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefType, children: FqnOrRefTypeChildren) {
    const fqnOrRefTypePartFirst = children.fqnOrRefTypePartFirst;

    return [
        ...[].concat(...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? [])
    ]

    // return {
    //     kind: 'FqnOrRefType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartFirst?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
