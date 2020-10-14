import { cstToAst } from '../cst-to-ast';
import { ArrayCreationExpression } from '../models/array-creation-expression.model';
import { ArrayCreationExpressionChildren } from '../models/array-creation-expression-children.model';

// @ts-ignore
export function run(cstNode: ArrayCreationExpression, children: ArrayCreationExpressionChildren): any {
    const arrayCreationExplicitInitSuffix = children.arrayCreationExplicitInitSuffix;
    const primitiveType = children.primitiveType;

    return [
        ...[].concat(...arrayCreationExplicitInitSuffix?.map(e => cstToAst(e)) ?? []),
        ...[].concat(...primitiveType?.map(e => cstToAst(e)) ?? [])
    ];
}
