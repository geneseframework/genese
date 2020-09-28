import { Location } from "./location.model";
import { PrimaryPrefixChildren } from "./primary-prefix-children.model";
import { MethodInvocationSuffixChildren } from './method-invocation-suffix-children.model';

export class MethodInvocationSuffix {
    name ?= '';
    children?: MethodInvocationSuffixChildren = new MethodInvocationSuffixChildren();
    location?: Location = new Location();
}
