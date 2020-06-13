import { JsonAst } from '../models/ast.model';
import { TreeFile } from '../../models/tree/tree-file.model';
import { Ast } from '../../services/ast.service';
import { TreeFolder } from '../../models/tree/tree-folder.model';

export class JsonToTreeFileService {

    static convert(jsonAst: JsonAst, treeFolder: TreeFolder): TreeFile {
        const treeFile = new TreeFile();
        treeFile.sourceFile = Ast.getSourceFile(jsonAst.sourceFile.path);
        treeFile.treeFolder = treeFolder;
        return treeFile;
    }

}
