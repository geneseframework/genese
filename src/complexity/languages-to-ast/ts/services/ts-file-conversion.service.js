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
        tsFile.name = file_service_1.getFilename(path);
        const tsNode = new ts_node_model_1.TsNode();
        tsNode.node = ts_service_1.Ts.getSourceFile(path);
        tsFile.text = this.getTextFile(path);
        tsFile.tsNode = this.createTsNodeChildren(tsNode);
        return tsFile;
    }
    /**
     * Returns the TsNode children of a given TsNode
     * @param tsNode        // The TsNode parent
     */
    createTsNodeChildren(tsNode) {
        ts.forEachChild(tsNode.node, (childTsNode) => {
            const newTsNode = new ts_node_model_1.TsNode();
            newTsNode.node = childTsNode;
            newTsNode.pos = ts_service_1.Ts.getPosition(newTsNode.node);
            newTsNode.end = ts_service_1.Ts.getEnd(newTsNode.node);
            newTsNode.name = ts_service_1.Ts.getName(newTsNode.node);
            newTsNode.kind = ts_service_1.Ts.getKind(newTsNode.node);
            tsNode.children.push(this.createTsNodeChildren(newTsNode));
        });
        return tsNode;
    }
    /**
     * Returns the text corresponding to a source code by escaping break lines
     * @param path
     */
    getTextFile(path) {
        let text = ts_service_1.Ts.getTextFile(path);
        return text;
        // return text.replace(/\n/g, `\\n`);
    }
}
exports.TsFileConversionService = TsFileConversionService;
