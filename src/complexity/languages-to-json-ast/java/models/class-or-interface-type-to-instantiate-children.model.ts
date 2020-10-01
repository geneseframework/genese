import { Infos } from './infos.model';
import { TypeArgumentsOrDiamond } from './type-arguments-or-diamond.model';

export class ClassOrInterfaceTypeToInstantiateChildren {
    Identifier?: Infos[] = [new Infos()];
    typeArgumentsOrDiamond?: TypeArgumentsOrDiamond[] = [new TypeArgumentsOrDiamond()];
}
