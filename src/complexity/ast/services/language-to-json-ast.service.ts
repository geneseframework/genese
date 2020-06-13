import { JsonAst } from '../models/ast.model';
import { Language } from '../enums/language.enum';
import { PhpToJsonAstService } from './php-to-json-ast.service';

export class LanguageToJsonAstService {

    static convert(path: string, language: Language): JsonAst {
        switch (language) {
            case Language.PHP:
                return PhpToJsonAstService.convert(path);
            default:
                console.error('Unknown language ', language);
                return undefined;
        }
    }

}
