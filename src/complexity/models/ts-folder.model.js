"use strict";
exports.__esModule = true;
var ts_folder_service_1 = require("../services/ts-folder.service");
var complexities_by_status_interface_1 = require("../interfaces/complexities-by-status.interface");
var TsFolder = /** @class */ (function () {
    function TsFolder() {
        this.cognitiveValue = 0;
        this.complexitiesByStatus = new complexities_by_status_interface_1.ComplexitiesByStatus();
        this.cyclomaticValue = 0;
        this.numberOfFiles = 0;
        this.numberOfMethods = 0;
        this.parent = undefined;
        this.path = '';
        this.relativePath = '';
        this.stats = undefined;
        this.subFolders = [];
        this.tsFiles = [];
        this.tsFolderService = undefined;
        this.tsFolderService = new ts_folder_service_1.TsFolderService(this);
    }
    TsFolder.prototype.getStats = function () {
        if (!this.stats) {
            this.stats = this.tsFolderService.getStats(this).plugChartHoles();
        }
        return this.stats;
    };
    TsFolder.prototype.evaluate = function () {
        var _a, _b;
        for (var _i = 0, _c = this.tsFiles; _i < _c.length; _i++) {
            var file = _c[_i];
            this.cognitiveValue += file.cognitiveValue;
            this.cyclomaticValue += file.cyclomaticValue;
            this.numberOfMethods += (_b = (_a = file.tsMethods) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            this.numberOfFiles++;
            this.complexitiesByStatus = this.complexitiesByStatus.add(file.complexitiesByStatus);
        }
    };
    return TsFolder;
}());
exports.TsFolder = TsFolder;
