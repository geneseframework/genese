import { Infos } from './infos.model';
import { ClassOrInterfaceTypeToInstantiate } from './class-or-interface-type-to-instantiate.model';

export class UnqualifiedClassInstanceCreationExpressionChildren {
    New?: Infos[] = [new Infos()];
    classOrInterfaceTypeToInstantiate?: ClassOrInterfaceTypeToInstantiate[] = [new ClassOrInterfaceTypeToInstantiate()];
    LBrace?: Infos[] = [new Infos()];
    RBrace?: Infos[] = [new Infos()];
}
