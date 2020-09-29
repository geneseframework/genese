import { Result } from './result.model';
import { MethodDeclarator } from './method-declarator.model';

export class MethodHeaderChildren {
    result?: Result[] = [new Result()];
    methodDeclarator?: MethodDeclarator[] = [new MethodDeclarator()];
}
