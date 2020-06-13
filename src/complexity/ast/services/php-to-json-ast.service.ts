import { JsonAst } from '../models/ast.model';

export class PhpToJsonAstService {

    static convert(path: string): JsonAst {
        const jsonAst = new JsonAst();
        jsonAst.sourceFile.path = path;
        return jsonAst;
    }

}
