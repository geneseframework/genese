import { getFilename } from '../../../core/services/file.service';
import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';

export class TsFileConversionService {


    generateTsFile(path: string, astFolder: TsFolder): TsFile {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new TsFile();
        tsFile.name = getFilename(path);
        tsFile.logg();
        return tsFile;
    }


}
