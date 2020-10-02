import { cstToAst } from '../cst-to-ast';
import { UnqualifiedClassInstanceCreationExpression } from '../models/unqualified-class-instance-creation-expression.model';
import { UnqualifiedClassInstanceCreationExpressionChildren } from '../models/unqualified-class-instance-creation-expression-children.model';

// @ts-ignore
export function run(cstNode: UnqualifiedClassInstanceCreationExpression, children: UnqualifiedClassInstanceCreationExpressionChildren): any {
    const new_ = children.New;
    const classOrInterfaceTypeToInstantiate = children.classOrInterfaceTypeToInstantiate;
    const argumentList = children.argumentList;

    return [
        ...[].concat(...classOrInterfaceTypeToInstantiate?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...argumentList?.map(e => cstToAst(e)) ?? []),
        ...new_?.map(e => cstToAst(e, 'identifier')) ?? []
    ];
}
