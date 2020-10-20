import { AnnotationChildren } from "./annotation-children.model";
import { Location } from "./location.model";

export class Annotation {
    name ?= '';
    children?: AnnotationChildren = new AnnotationChildren();
    location?: Location = new Location();
}
