import { BlockStatements } from "./block-statements.model";
import { SwitchLabel } from "./switch-label.model";

export class SwitchCaseChildren {
    switchLabel?: SwitchLabel[] = [new SwitchLabel()];
    blockStatements?: BlockStatements[] = [new BlockStatements()];
}
