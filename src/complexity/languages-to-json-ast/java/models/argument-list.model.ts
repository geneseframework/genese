import { Location } from "./location.model";
import { PrimaryPrefixChildren } from "./primary-prefix-children.model";
import { MethodInvocationSuffixChildren } from './method-invocation-suffix-children.model';

export class ArgumentList {
    name ?= '';
    children?: any = undefined;
    location?: Location = new Location();
}
