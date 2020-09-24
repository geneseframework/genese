import { cstToAst } from '../cstToAst';
import { UnaryExpression } from '../models/unary-expression.model';
import { UnaryExpressionChildren } from '../models/unary-expression-children.model';

// @ts-ignore
export function run(cstNode: UnaryExpression, children: UnaryExpressionChildren) {
    const unaryPrefixOperator = children.UnaryPrefixOperator;
    const identifier = children.primary[0].children.primaryPrefix[0].children.fqnOrRefType[0].children.fqnOrRefTypePartFirst[0].children.fqnOrRefTypePartCommon[0].children.Identifier[0];

    if (unaryPrefixOperator) {
        const unaryPrefixOperatorAst = cstToAst(unaryPrefixOperator, 'unaryPrefixOperator');
        unaryPrefixOperatorAst.children.push(cstToAst(identifier, 'identifier'));
        return unaryPrefixOperatorAst;
    } else {
        return cstToAst(identifier, 'identifier');
    }
}
