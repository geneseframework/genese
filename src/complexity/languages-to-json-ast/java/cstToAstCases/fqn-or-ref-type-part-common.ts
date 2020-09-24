import { cstToAst } from '../cstToAst';
import { FqnOrRefTypePartCommon } from '../models/fqn-or-ref-type-part-common.model';
import { FqnOrRefTypePartCommonChildren } from '../models/fqn-or-ref-type-part-common-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefTypePartCommon, children: FqnOrRefTypePartCommonChildren) {
    const identifier = children.Identifier;

    return [
        ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    ]

    // return {
    //     kind: 'FqnOrRefTypePartCommon',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...identifier?.map(e => cstToAst(e, 'identifier')) ?? []
    //     ]
    // };
}
