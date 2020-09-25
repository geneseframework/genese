import { cstToAst } from '../cstToAst';
import { FqnOrRefTypePartFirst } from '../models/fqn-or-ref-type-part-first.model';
import { FqnOrRefTypePartFirstChildren } from '../models/fqn-or-ref-type-part-first-children.model';

// @ts-ignore
export function run(cstNode: FqnOrRefTypePartFirst, children: FqnOrRefTypePartFirstChildren) {
    const fqnOrRefTypePartCommon = children.fqnOrRefTypePartCommon;

    return [
        ...[].concat(...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? [])
    ]
    
    // return {
    //     kind: 'FqnOrRefTypePartFirst',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     pos: cstNode.location.startOffset,
    //     children: [
    //         ...fqnOrRefTypePartCommon?.map(e => cstToAst(e)) ?? []
    //     ]
    // };
}
