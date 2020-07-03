"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFile = void 0;
const chalk = require("chalk");
/**
 * Class corresponding to a ts.SourceFile object
 */
class TsFile {
    constructor() {
        this.end = undefined; // The pos of the end of the source code : will be injected as is in the JsonAst file
        this.name = undefined; // The name of the file (ie of the TsFile) : will be injected as is in the JsonAst file
        this.sourceFile = undefined; // The Typescript SourceFile object corresponding to the file relative to this TsFile
        this.text = ''; // The source code of the TsFile : will be injected as is in the JsonAst file
        this.tsNode = undefined; // The TsNode corresponding to the file itself
    }
    /**
     * Logs the main elements of the TsFile
     * @param message
     */
    logg(message) {
        var _a;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FILE'));
        console.log(this.name);
        console.log('-----------------------------');
        console.log(chalk.blueBright('end :'), this.end);
        console.log(chalk.blueBright('text :'), this.text);
        console.log(chalk.blueBright('tsNode :'), (_a = this.tsNode) === null || _a === void 0 ? void 0 : _a.kind);
        this.loggChildren(this.tsNode, '  ');
    }
    /**
     * Logs the main elements of the children of the TsFile
     * @param tsNode        // The parent TsNode
     * @param indent        // The current indentation in the log
     */
    loggChildren(tsNode, indent = '') {
        var _a;
        for (const childAstNode of tsNode === null || tsNode === void 0 ? void 0 : tsNode.children) {
            const name = (_a = childAstNode === null || childAstNode === void 0 ? void 0 : childAstNode.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright(`${indent}${childAstNode.kind}`), name);
            this.loggChildren(childAstNode, `${indent}  `);
        }
    }
}
exports.TsFile = TsFile;
