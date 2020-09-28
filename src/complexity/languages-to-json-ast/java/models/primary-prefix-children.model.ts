import { FqnOrRefType } from "./fqn-or-ref-type.model";
import { Literal } from "./literal.model";
import { ParenthesisExpressionChildren } from "./parenthesis-expression-children.model";

export class PrimaryPrefixChildren {
    fqnOrRefType?: FqnOrRefType[] = [new FqnOrRefType()];
    literal?: Literal[] = [new Literal()];
    parenthesisExpression?: ParenthesisExpressionChildren[] = [new ParenthesisExpressionChildren()];
}
