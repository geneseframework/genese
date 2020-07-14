"use strict";
var _parent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsFolder = void 0;
const chalk = require("chalk");
class TsFolder {
    constructor() {
        this.children = []; // The subfolders of this TsFolder
        _parent.set(this, undefined); // The TsFolder corresponding to the parent folder of this TsFolder
        this.path = undefined; // The absolute path of this TsFolder : will be injected as is in the JsonAst file
        this.tsFiles = []; // The array of files of this TsFolder (not in the subfolders) : will be used to create the property "astFiles" of the JsonAst
    }
    // ---------------------------------------------------------------------------------
    //                                Getters and setters
    // ---------------------------------------------------------------------------------
    //
    // get parent(): TsFolder {
    //     return this.#parent;
    // }
    //
    //
    // set parent(tsFolder: TsFolder) {
    //     this.#parent = tsFolder;
    // }
    // ---------------------------------------------------------------------------------
    //                                  Other methods
    // ---------------------------------------------------------------------------------
    /**
     * Logs the main elements of the TsFolder
     * @param message
     */
    logg(message) {
        var _a;
        console.log('-----------------------------');
        console.log(chalk.yellowBright(message !== null && message !== void 0 ? message : 'AST_FOLDER'));
        console.log(this.path);
        console.log('-----------------------------');
        // console.log(chalk.blueBright('parent :'), this.parent?.path);
        for (const astFile of this.tsFiles) {
            const name = (_a = astFile === null || astFile === void 0 ? void 0 : astFile.name) !== null && _a !== void 0 ? _a : '';
            console.log(chalk.blueBright('TsFile'), chalk.yellowBright(`  ${name}`));
            this.loggChildren(astFile === null || astFile === void 0 ? void 0 : astFile.tsNode, `  `);
        }
    }
    /**
     * Logs the main elements of the children of the TsFolder
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
exports.TsFolder = TsFolder;
_parent = new WeakMap();
