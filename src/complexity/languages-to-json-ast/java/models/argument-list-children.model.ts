import { Location } from "./location.model";
import { PrimaryPrefixChildren } from "./primary-prefix-children.model";
import { MethodInvocationSuffixChildren } from './method-invocation-suffix-children.model';
import { Expression } from './expression.model';

export class ArgumentListChildren {
    expression?: Expression[] = [new Expression()];
}
