import { Infos } from './infos.model';
import { ArgumentList } from './argument-list.model';
import { ClassOrInterfaceTypeToInstanciate } from './class-or-interface-type-to-instantiate.model';

export class UnqualifiedClassInstanceCreationExpressionChildren {
    New?: Infos[] = [new Infos()];
    LBrace?: Infos[] = [new Infos()];
    RBrace?: Infos[] = [new Infos()];
    classOrInterfaceTypeToInstantiate?: ClassOrInterfaceTypeToInstanciate[] = [new ClassOrInterfaceTypeToInstanciate()];
    argumentList?: ArgumentList[] = [new ArgumentList()];
}
