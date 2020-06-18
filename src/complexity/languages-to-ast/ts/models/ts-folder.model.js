"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFolder = void 0;
const chalk = require("chalk");
class TsFolder {
    constructor() {
        this.tsFiles = []; // The array of files of this folder (not in the subfolders)
        this.children = []; // The subfolders of this folder
        this.parent = undefined; // The TsFolder corresponding to the parent folder of this TsFolder
        this.path = undefined; // The absolute path of this folder
    }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    logg(message) {
        var _a, _b;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        console.log(chalk.blueBright('parent :'), (_a = this.parent) === null || _a === void 0 ? void 0 : _a.path);
        for (const astFile of this.tsFiles) {
            const name = (_b = astFile === null || astFile === void 0 ? void 0 : astFile.name) !== null && _b !== void 0 ? _b : '';
            console.log(chalk.blueBright('TsFile'), chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile === null || astFile === void 0 ? void 0 : astFile.tsNode, `  `);
        }
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
exports.TsFolder = TsFolder;
