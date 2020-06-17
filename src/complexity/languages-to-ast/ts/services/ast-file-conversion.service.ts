import { AstFolder } from '../../../core/models/ast/ast-folder.model';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { getFilename } from '../../../core/services/file.service';

export class AstFileConversionService {


    generateAstFile(path: string, astFolder: AstFolder): AstFile {
        if (!path || !astFolder) {
            console.warn('No path or AstFolder : impossible to create AstFile');
            return undefined;
        }
        const astFile = new AstFile();
        astFile.astFolder = astFolder;
        astFile.name = getFilename(astFolder.path);
        astFile.logg();
        return astFile;
    }


}
