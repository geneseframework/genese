import * as ts from 'typescript';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { AstFile } from '../../../core/models/ast/ast-file.model';

export class AstFileService {


    generateAstFile(path: string, astFolder: AstFolder): AstFile {
        const astFile = new AstFile();
        astFile.astFolder = astFolder;
        return astFile;
    }


}
