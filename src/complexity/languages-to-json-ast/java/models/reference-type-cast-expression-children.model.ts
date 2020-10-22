import { ReferenceType } from './reference-type.model';
import { UnaryExpressionNotPlusMinus } from './unary-expression-not-plus-minus.model';

export class ReferenceTypeCastExpressionChildren {
    referenceType?: ReferenceType[] = [new ReferenceType()];
    unaryExpressionNotPlusMinus?: UnaryExpressionNotPlusMinus[] = [new UnaryExpressionNotPlusMinus()];
}
