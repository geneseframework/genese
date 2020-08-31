import { Infos } from "./infos.model";

export class PackageDeclarationChildren {
    package?: Infos[] = [new Infos()];
    identifier?: Infos[] = [new Infos()];
    dot?: Infos[] = [new Infos()];
    semicolon?: Infos[] = [new Infos()];
}
