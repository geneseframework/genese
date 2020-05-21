"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _zzz;
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("./models/options");
const file_service_1 = require("./services/file.service");
const reports_service_1 = require("./services/reports.service");
const tree_folder_service_1 = require("./services/tree-folder.service");
const ansi_colors_1 = require("ansi-colors");
class Main {
    constructor() {
        _zzz.set(this, 'zzz');
    }
    start(pathCommand, pathToAnalyze, pathGeneseNodeJs) {
        console.log('START CALCULATION');
        console.log('ZZZ = ', __classPrivateFieldGet(this, _zzz));
        options_1.Options.setOptions(pathCommand, pathToAnalyze, pathGeneseNodeJs);
        file_service_1.createOutDir();
        const tsFolder = tree_folder_service_1.TreeFolderService.generateTree(options_1.Options.pathFolderToAnalyze, 'ts');
        reports_service_1.ReportsService.generateAllReports(tsFolder);
        console.log(ansi_colors_1.blueBright('COMPLEXITY REPORT GENERATED SUCCESSFULLY'));
    }
}
exports.Main = Main;
_zzz = new WeakMap();
