import { cstToAst } from '../cstToAst';
import { IntegralType } from '../models/integral-type.model';
import { IntegralTypeChildren } from '../models/integral-type-children.model';

// @ts-ignore
export function run(cstNode: IntegralType, children: IntegralTypeChildren) {
    const int = children.Int;

    return [
        ...int.map(e => cstToAst(e, 'int'))
    ]

    // return {
    //     kind: 'IntegralType',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...int.map(e => cstToAst(e, 'int')),
    //     ]
    // };
}
