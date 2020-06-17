"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFileConversionService = void 0;
const ts = require("typescript");
const file_service_1 = require("../../../core/services/file.service");
const ts_file_model_1 = require("../models/ts-file.model");
const ts_service_1 = require("./ts.service");
const ts_node_model_1 = require("../models/ts-node.model");
class TsFileConversionService {
    generateTsFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new ts_file_model_1.TsFile();
        tsFile.name = file_service_1.getFilename(path);
        const tsNode = new ts_node_model_1.TsNode();
        tsNode.node = ts_service_1.Ts.getSourceFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode);
        // tsFile.logg();
        return tsFile;
    }
    createTsNodeChildren(tsNode) {
        ts.forEachChild(tsNode.node, (childTsNode) => {
            const newTsNode = new ts_node_model_1.TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = ts_service_1.Ts.getPosition(newTsNode.node);
            newTsNode.end = ts_service_1.Ts.getEnd(newTsNode.node);
            // newTsNode.logg();
            tsNode.children.push(this.createTsNodeChildren(newTsNode));
        });
        return tsNode;
    }
}
exports.TsFileConversionService = TsFileConversionService;
