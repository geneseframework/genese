import { Infos } from './infos.model';
import { SimpleTypeName } from './simple-type-name.model';

export class ConstructorDeclaratorChildren {
    LBrace?: Infos[] = [new Infos()];
    RBrace?: Infos[] = [new Infos()];
    simpleTypeName: SimpleTypeName[] = [new SimpleTypeName()]
}
