import { Location } from "./location.model";
import { Expression } from "./expression.model";

export class StatementExpression {
    name?: '';
    children?: Expression[] = [new Expression()];
    location?: Location = new Location();
}
