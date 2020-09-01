import { Infos } from "./infos.model";
import { Location } from "./location.model";

export class StatementWithoutTrailingSubstatement {
    name?: '';
    children?: Infos = new Infos();
    location?: Location = new Location()
}
