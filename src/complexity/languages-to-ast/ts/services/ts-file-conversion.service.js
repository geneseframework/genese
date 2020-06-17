"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFileConversionService = void 0;
const file_service_1 = require("../../../core/services/file.service");
const ts_file_model_1 = require("../models/ts-file.model");
class TsFileConversionService {
    generateTsFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new ts_file_model_1.TsFile();
        tsFile.name = file_service_1.getFilename(path);
        tsFile.logg();
        return tsFile;
    }
}
exports.TsFileConversionService = TsFileConversionService;
