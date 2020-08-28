import { MethodDeclarator } from "./method-declarator.model";
import { Result } from "./result.model";

export class MethodModifierChildren {
    result?: Result = new Result();
    methodDeclarator?: MethodDeclarator = new MethodDeclarator();
}
