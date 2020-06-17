import { JsonAst } from '../../../core/models/ast/json-ast.model';

export class PhpToJsonAstService {

    static convert(path: string): JsonAst {
        const jsonAst = new JsonAst();
        return jsonAst;
    }

}
