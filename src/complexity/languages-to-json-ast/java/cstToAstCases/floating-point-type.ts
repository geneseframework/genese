import { cstToAst } from '../cstToAst';
import { FloatingPointType } from '../models/floating-point-type.model';
import { FloatingPointTypeChildren } from '../models/floating-point-type-children.model';

// @ts-ignore
export function run(cstNode: FloatingPointType, children: FloatingPointTypeChildren) {
    const Double = children.Double;

    return [
        ...Double.map(e => cstToAst(e, 'double'))
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
