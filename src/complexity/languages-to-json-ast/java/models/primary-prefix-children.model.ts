import { FqnOrRefType } from "./fqn-or-ref-type.model";
import { Literal } from "./literal.model";
import { ParenthesisExpressionChildren } from "./parenthesis-expression-children.model";
import { Infos } from './infos.model';

export class PrimaryPrefixChildren {
    fqnOrRefType?: FqnOrRefType[] = [new FqnOrRefType()];
    literal?: Literal[] = [new Literal()];
    parenthesisExpression?: ParenthesisExpressionChildren[] = [new ParenthesisExpressionChildren()];
    This?: Infos[] =  [new Infos()];
}
