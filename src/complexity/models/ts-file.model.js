"use strict";
exports.__esModule = true;
var ts_folder_model_1 = require("./ts-folder.model");
var ts_file_service_1 = require("../services/ts-file.service");
var complexities_by_status_service_1 = require("../services/complexities-by-status.service");
var TsFile = /** @class */ (function () {
    function TsFile() {
        this.cognitiveValue = 0;
        this.complexitiesByStatus = undefined;
        this.cyclomaticValue = 0;
        this.name = '';
        this.sourceFile = undefined;
        this.stats = undefined;
        this.tsFileService = undefined;
        this.tsFolder = new ts_folder_model_1.TsFolder();
        this.tsMethods = [];
        this.tsFileService = new ts_file_service_1.TsFileService(this);
    }
    TsFile.prototype.evaluate = function () {
        var cpss = new complexities_by_status_service_1.ComplexitiesByStatusService();
        for (var _i = 0, _a = this.tsMethods; _i < _a.length; _i++) {
            var method = _a[_i];
            this.cognitiveValue += method.cognitiveValue;
            this.cyclomaticValue += method.cyclomaticValue;
            this.complexitiesByStatus = cpss.addMethodCpxByStatus(this.complexitiesByStatus, method);
        }
    };
    TsFile.prototype.getStats = function () {
        if (!this.stats) {
            this.stats = this.tsFileService.getStats(this);
        }
        return this.stats;
    };
    TsFile.prototype.setName = function () {
        this.name = this.sourceFile.fileName;
    };
    return TsFile;
}());
exports.TsFile = TsFile;
