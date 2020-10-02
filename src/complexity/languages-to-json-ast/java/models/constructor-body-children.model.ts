import { BlockStatements } from './block-statements.model';
import { Infos } from './infos.model';

export class ConstructorBodyChildren {
    LCurly?: Infos[] = [new Infos()];
    RCurly?: Infos[] = [new Infos()];
    blockStatements: BlockStatements[] = [new BlockStatements()]
}
