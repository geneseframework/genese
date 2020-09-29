import { Infos } from './infos.model';
import { MethodInvocationSuffix } from './method-invocation-suffix.model';

export class PrimarySuffixChildren {
    Identifier?: Infos[] = [new Infos()];
    methodInvocationSuffix?: MethodInvocationSuffix[] = [new MethodInvocationSuffix()];
}
