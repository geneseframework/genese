import { BinaryExpression } from './binary-expression.model';
import { Expression } from './expression.model';

export class TernaryExpressionChildren {
    binaryExpression?: BinaryExpression[] = [new BinaryExpression()];
    expression?: Expression[] = [new Expression()];
}
