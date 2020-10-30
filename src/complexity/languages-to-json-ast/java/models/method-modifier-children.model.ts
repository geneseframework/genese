import { Infos } from './infos.model';
import { AnnotationElement } from './annotation-element.model';

export class MethodModifierChildren {
    Private?: Infos[] = [new Infos()];
    Protected?: Infos[] = [new Infos()];
    Public?: Infos[] = [new Infos()];
    Static?: Infos[] = [new Infos()];
    annotation?: AnnotationElement[] = [new AnnotationElement()];
}
