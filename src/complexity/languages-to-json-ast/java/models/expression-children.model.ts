import { TernaryExpression } from './ternary-expression.model';

export class ExpressionChildren {
    ternaryExpression?: TernaryExpression[] = [new TernaryExpression()];
    lambdaExpression?: LambdaExpression[] = [new LambdaExpression()];
}
