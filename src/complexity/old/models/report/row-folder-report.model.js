"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowFolderReport = void 0;
/**
* Defines the model of a row in the arrays of folders reports
*/
class RowFolderReport {
    constructor() {
        this.numberOfFiles = 0; // The number of files of the folder analysed in the row (and its subfolders)
        this.numberOfMethods = 0; // The number of methods of the folder analysed in the row (and its subfolders)
        this.path = ''; // The path  of the folder analysed in the row
        this.routeFromCurrentFolder = ''; // The route between the current folder and the subfolder analysed in the row
    }
}
exports.RowFolderReport = RowFolderReport;
