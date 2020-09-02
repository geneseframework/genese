import { Infos } from "./infos.model";
import { PackageOrTypeName } from "./package-or-type-name.model";

/**
 * We are forced to write on PascalCase some properties
 * java-parser returns also PascalCase properties 
 */
export class ImportChildren {
    Import?: Infos[] = [new Infos()];
    packageOrTypeName?: PackageOrTypeName[] = [new PackageOrTypeName()];
    Semicolon?: Infos[] = [new Infos()];
}
