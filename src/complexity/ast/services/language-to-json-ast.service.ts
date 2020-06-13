import { JsonAst } from '../models/ast.model';
import { Language } from '../enums/language.enum';
import { TsToJsonAstService } from './ts-to-json-ast.service';
import { Ast } from '../../services/ast.service';

export class LanguageToJsonAstService {

    static convert(path: string, language: Language): JsonAst {
        switch (language) {
            case Language.TS:
            case Language.TYPESCRIPT:
                return TsToJsonAstService.convert(Ast.getSourceFile(path));
            default:
                console.error('Unknown language ', language);
                return undefined;
        }
    }

}
