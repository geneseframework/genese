import { Location } from './location.model';
import { ClassOrInterfaceTypeToInstantiateChildren } from './class-or-interface-type-to-instantiate-children.model';

export class ClassOrInterfaceTypeToInstantiate {
    name ?= '';
    children?: ClassOrInterfaceTypeToInstantiateChildren = new ClassOrInterfaceTypeToInstantiateChildren();
    location?: Location = new Location();
}
