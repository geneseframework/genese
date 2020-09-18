import { IntegerLiteral } from "./integer-literal.model";
import { BooleanLiteral } from "./boolean-literal.model";

export class LiteralChildren {
    integerLiteral?: IntegerLiteral[] = [new IntegerLiteral()];
    booleanLiteral?: BooleanLiteral[] = [new BooleanLiteral()]
}
