import { Annotation } from "./annotation.model";
import { Infos } from "./infos.model";

export class ClassModifierChildren {
    annotation?: Annotation[] = [new Annotation()];
    Public?: Infos[] = [new Infos()];
}
