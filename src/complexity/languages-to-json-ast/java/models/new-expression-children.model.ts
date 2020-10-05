import { Infos } from './infos.model';
import { UnqualifiedClassInstanceCreationExpression } from './unqualified-class-instance-creation-expression.model';

export class NewExpressionChildren {
    Identifier?: Infos[] = [new Infos()];
    unqualifiedClassInstanceCreationExpression?: UnqualifiedClassInstanceCreationExpression[] = [new UnqualifiedClassInstanceCreationExpression()];
}
