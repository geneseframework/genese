import { Infos } from "./infos.model";
import { PackageOrTypeName } from "./package-or-type-name.model";

export class ImportChildren {
    Import?: Infos[] = [new Infos()];
    packageOrTypeName?: PackageOrTypeName[] = [new PackageOrTypeName()];
    Semicolon?: Infos[] = [new Infos()];
}
