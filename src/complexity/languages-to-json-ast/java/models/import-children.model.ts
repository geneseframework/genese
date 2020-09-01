import { Infos } from "./infos.model";
import { PackageOrTypeName } from "./package-or-type-name.model";

export class ImportChildren {
    import?: Infos[] = [new Infos()];
    packageOrTypeName?: PackageOrTypeName[] = [new PackageOrTypeName()];
    semicolon?: Infos[] = [new Infos()];
}
