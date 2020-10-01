import { cstToAst } from '../cst-to-ast';
import { UnqualifiedClassInstanceCreationExpression } from '../models/unqualified-class-instance-creation-expression.model';
import { UnqualifiedClassInstanceCreationExpressionChildren } from '../models/unqualified-class-instance-creation-expression-children.model';

// @ts-ignore
export function run(cstNode: UnqualifiedClassInstanceCreationExpression, children: UnqualifiedClassInstanceCreationExpressionChildren): any {
    const classOrInterfaceTypeToInstantiate = children.classOrInterfaceTypeToInstantiate;
    const new_ = children.New;

    return [
        ...[].concat(...classOrInterfaceTypeToInstantiate?.map(e => cstToAst(e), 'new') ?? []),
        ...new_?.map(e => cstToAst(e), 'new') ?? []
    ];
}
