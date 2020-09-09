import { Infos } from "./infos.model";
import { UnaryExpression } from "./unary.expression.model";

export class BinaryExpressionChildren {
    unaryExpression?: UnaryExpression[] = [new UnaryExpression()];
    BinaryOperator?: Infos[] = [new Infos()];
}
