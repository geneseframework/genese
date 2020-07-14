"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFileConversionService = void 0;
const ts = require("typescript");
const file_service_1 = require("../../../core/services/file.service");
const ts_file_model_1 = require("../models/ts-file.model");
const ts_service_1 = require("./ts.service");
const ts_node_model_1 = require("../models/ts-node.model");
/**
 * - TsFiles generation from their Abstract Syntax Tree (AST)
 */
class TsFileConversionService {
    /**
     * Generates the TsFile corresponding to a given path and a given TsFolder
     * @param path          // The path of the file
     * @param astFolder     // The TsFolder containing the TsFile
     */
    generateTsFile(path, astFolder) {
        if (!path || !astFolder) {
            console.warn('No path or TsFolder : impossible to create TsFile');
            return undefined;
        }
        const tsFile = new ts_file_model_1.TsFile();
        const name = file_service_1.getFilename(path);
        if (name) {
            tsFile.name = name;
        }
        const tsNode = new ts_node_model_1.TsNode();
        // const tsNode = new TsNode();
        // tsNode.node = project.getSourceFile(path);
        tsNode.node = ts_service_1.Ts.getSourceFile(path);
        tsFile.text = ts_service_1.Ts.getTextFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode, ts_service_1.Ts.getSourceFile(path));
        return tsFile;
    }
    /**
     * Returns the TsNode children of a given TsNode
     * @param tsNode            // The TsNode parent
     * @param sourceFile        // The AST node of the file itself
     */
    createTsNodeChildren(tsNode, sourceFile) {
        ts.forEachChild(tsNode.node, (childTsNode) => {
            const newTsNode = new ts_node_model_1.TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = ts_service_1.Ts.getPosition(newTsNode.node);
            newTsNode.start = ts_service_1.Ts.getStart(newTsNode.node, sourceFile);
            newTsNode.end = ts_service_1.Ts.getEnd(newTsNode.node);
            newTsNode.name = ts_service_1.Ts.getName(newTsNode.node);
            newTsNode.kind = ts_service_1.Ts.getKindAlias(newTsNode.node);
            tsNode.children.push(this.createTsNodeChildren(newTsNode, sourceFile));
        });
        return tsNode;
    }
}
exports.TsFileConversionService = TsFileConversionService;
