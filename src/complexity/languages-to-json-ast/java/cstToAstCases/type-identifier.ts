import { cstToAst } from '../cstToAst';
import { TypeIdentifierElement } from '../models/type-identifier-element.model';
import { TypeIdentifierChildren } from '../models/type-identifier-children.model';

// @ts-ignore
export function run(cstNode: TypeIdentifierElement, children: TypeIdentifierChildren) {
    const identifier = children.Identifier;

    return [
        ...identifier.map(e => cstToAst(e, 'identifier')),
    ]

    // return {
    //     kind: 'TypeIdentifier',
    //     start: cstNode.location.startOffset,
    //     end: cstNode.location.endOffset,
    //     children: [
    //         ...identifier.map(e => cstToAst(e, 'identifier')),
    //     ]
    // };
}
