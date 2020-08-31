import { Infos } from "./infos.model";

export class PackageDeclarationChildren {
    dot?: Infos[] = [new Infos()];
    identifier?: Infos[] = [new Infos()];
    package?: Infos[] = [new Infos()];
    semicolon?: Infos[] = [new Infos()];
}
