import { Location } from "./location.model";
import { PrimaryPrefixChildren } from "./primary-prefix-children.model";
import { ArgumentList } from './argument-list.model';

export class MethodInvocationSuffixChildren {
    argumentList?: ArgumentList[] = [new ArgumentList()];
}
