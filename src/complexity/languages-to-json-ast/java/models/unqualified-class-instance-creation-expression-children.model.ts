import { Infos } from './infos.model';
import { ClassOrInterfaceTypeToInstantiate } from './class-or-interface-type-to-instantiate.model';
import { ArgumentList } from './argument-list.model';

export class UnqualifiedClassInstanceCreationExpressionChildren {
    New?: Infos[] = [new Infos()];
    classOrInterfaceTypeToInstantiate?: ClassOrInterfaceTypeToInstantiate[] = [new ClassOrInterfaceTypeToInstantiate()];
    LBrace?: Infos[] = [new Infos()];
    argumentList?: ArgumentList[] = [new ArgumentList()];
    RBrace?: Infos[] = [new Infos()];
}
