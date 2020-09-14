import { Infos } from "./infos.model";
import { UnaryExpression } from "./unary.expression.model";
import { Expression } from "./expression.model";

export class BinaryExpressionChildren {
    unaryExpression?: UnaryExpression[] = [new UnaryExpression()];
    BinaryOperator?: Infos[] = [new Infos()];
    AssignmentOperator?: Infos[] = [new Infos()];
    expression?: Expression[] = [new Expression()];
}
