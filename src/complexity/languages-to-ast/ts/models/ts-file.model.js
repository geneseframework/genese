"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFile = void 0;
const chalk = require("chalk");
class TsFile {
    constructor() {
        this.end = undefined;
        this.name = undefined;
        this.sourceFile = undefined; // The Typescript JsonAst
        this.text = '';
        this.tsNode = undefined; // The TsNode corresponding to the file itself
    }
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
