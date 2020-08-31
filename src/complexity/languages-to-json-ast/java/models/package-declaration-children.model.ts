import { Infos } from "./infos.model";

export class PackageDeclarationChildren {
    Package?: Infos[] = [new Infos()];
    Identifier?: Infos[] = [new Infos()];
    Dot?: Infos[] = [new Infos()];
    Semicolon?: Infos[] = [new Infos()];
}
