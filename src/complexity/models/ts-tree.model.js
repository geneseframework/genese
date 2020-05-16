"use strict";
exports.__esModule = true;
var chalk = require('chalk');
var TsTree = /** @class */ (function () {
    function TsTree() {
        this.children = [];
        this.depth = 0;
        this.increasesCognitiveComplexity = false;
        this.kind = '';
        this.tsMethod = undefined;
    }
    TsTree.prototype.printAllChildren = function () {
        this.printChildren(this, ' ');
    };
    TsTree.prototype.printChildren = function (tsTree, indent) {
        for (var _i = 0, _a = tsTree.children; _i < _a.length; _i++) {
            var childTree = _a[_i];
            var color = childTree.increasesCognitiveComplexity ? 'red' : 'white';
            console.log(indent, chalk[color](childTree.kind), 'depth', childTree.depth, 'parent', tsTree.kind);
            var newIndent = indent + '  ';
            this.printChildren(childTree, newIndent);
        }
    };
    return TsTree;
}());
exports.TsTree = TsTree;
