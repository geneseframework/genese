import { TernaryExpression } from "./ternary-expression.model";
import { LambdaExpression } from "./lambda-expression.model";

export class ExpressionChildren {
    ternaryExpression?: TernaryExpression[] = [new TernaryExpression()];
    lambdaExpression?: LambdaExpression[] = [new LambdaExpression()];
}
