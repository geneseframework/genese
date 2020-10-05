import { Infos } from './infos.model';
import { ArgumentList } from './argument-list.model';
import { ClassOrInterfaceTypeToInstanciate } from './class-or-interface-type-to-instantiate.model';

export class UnqualifiedClassInstanceCreationExpressionChildren {
    New?: Infos[] = [new Infos()];
    classOrInterfaceTypeToInstantiate?: ClassOrInterfaceTypeToInstanciate[] = [new ClassOrInterfaceTypeToInstanciate()];
    LBrace?: Infos[] = [new Infos()];
    argumentList?: ArgumentList[] = [new ArgumentList()];
    RBrace?: Infos[] = [new Infos()];
}
