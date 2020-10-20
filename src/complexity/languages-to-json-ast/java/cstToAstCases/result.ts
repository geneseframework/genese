import { cstToAst } from '../cst-to-ast';
import { Result } from '../models/result.model';
import { ResultChildren } from '../models/result-children.model';

// @ts-ignore
export function run(cstNode: Result, children: ResultChildren): any {
    const unannType = children.unannType;

    return [
        ...[].concat(...unannType?.map(e => cstToAst(e)) || []),
    ];
}
