"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsJsonAst = void 0;
const chalk = require("chalk");
class TsJsonAst {
    constructor() {
        this.tsFolder = undefined;
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    // get tsFolder(): TsFolder {
    //     return this.#tsFolder;
    // }
    //
    //
    // set tsFolder(tsFolder: TsFolder) {
    //     this.#tsFolder = tsFolder;
    // }
    // ---------------------------------------------------------------------------------
    //                                Other methods
    // ---------------------------------------------------------------------------------
    logg(message) {
        var _a, _b, _c, _d, _e;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'TS JSON_AST'));
        console.log((_a = this.tsFolder) === null || _a === void 0 ? void 0 : _a.path);
        console.log('-----------------------------');
        for (const tsFile of (_c = (_b = this.tsFolder) === null || _b === void 0 ? void 0 : _b.tsFiles) !== null && _c !== void 0 ? _c : []) {
            console.log(chalk.blueBright('tsFile'), tsFile === null || tsFile === void 0 ? void 0 : tsFile.name);
            console.log(chalk.blueBright('tsFile astNode'), (_d = tsFile === null || tsFile === void 0 ? void 0 : tsFile.tsNode) === null || _d === void 0 ? void 0 : _d.kind);
            this.loggChildren(tsFile.tsNode, '  ');
        }
        console.log(chalk.blueBright('children'), (_e = this.tsFolder) === null || _e === void 0 ? void 0 : _e.children);
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
exports.TsJsonAst = TsJsonAst;
