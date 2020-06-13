import { JsonAst } from '../models/ast.model';
import { TreeFile } from '../../models/tree/tree-file.model';
import { Ast } from '../../services/ast.service';

export class JsonToTreeFileService {

    convert(jsonAst: JsonAst): TreeFile {
        const treeFile = new TreeFile();
        treeFile.sourceFile = Ast.getSourceFile(jsonAst.sourceFile.path);
        return ;
    }

}
