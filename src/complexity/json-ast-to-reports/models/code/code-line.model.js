"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _code, _isEndingWithBlockComments;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeLine = void 0;
const cpx_factors_model_1 = require("../../../core/models/cpx-factor/cpx-factors.model");
const nesting_cpx_model_1 = require("../../../core/models/cpx-factor/nesting-cpx.model");
const depth_cpx_model_1 = require("../../../core/models/cpx-factor/depth-cpx.model");
const tools_service_1 = require("../../../core/services/tools.service");
const code_service_1 = require("../../services/code.service");
class CodeLine {
    constructor() {
        this.astNodes = []; // The array of AstNodes corresponding to AST nodes in this line of code
        _code.set(this, undefined);
        this.cpxFactors = new cpx_factors_model_1.CpxFactors(); // The complexity factors relative to this line (breakFlows, increments,...)
        this.end = 0; // The position (in number of characters) of the end of the line
        _isEndingWithBlockComments.set(this, void 0);
        this.issue = 0; // The number of the line in its Code parentFunction (method)
        this.pos = 0; // The relative position (in number of characters) of the start of the line in its Code
        this.start = 0; // The absolute position (in number of characters) of the start of the line in the SourceFile
        this.text = ''; // The text of the line
    }
    get code() {
        return __classPrivateFieldGet(this, _code);
    }
    set code(code) {
        __classPrivateFieldSet(this, _code, code);
    }
    get isEndingWithBlockComments() {
        if (__classPrivateFieldGet(this, _isEndingWithBlockComments) !== undefined) {
            return __classPrivateFieldGet(this, _isEndingWithBlockComments);
        }
        __classPrivateFieldSet(this, _isEndingWithBlockComments, new code_service_1.CodeService().isEndingWithBlockComments(this));
        return __classPrivateFieldGet(this, _isEndingWithBlockComments);
    }
    get hasNode() {
        return this.textWithoutComments.trim().length > 0;
    }
    /**
     * Checks if a line is commented
     */
    get isCommented() {
        return this.text.trim().slice(0, 2) === `//` || this.text.trim().slice(0, 2) === `/*`;
    }
    get lengthWithoutComments() {
        // console.log('WTH=OUTTTT COMMENTS', this.textWithoutComments.trim())
        return this.textWithoutComments.trimRight().length;
    }
    get previousLine() {
        var _a, _b;
        return this.issue > 1 ? (_b = (_a = this.code) === null || _a === void 0 ? void 0 : _a.lines) === null || _b === void 0 ? void 0 : _b[this.issue - 2] : undefined;
    }
    get textWithoutComments() {
        var _a;
        let text = this.textWithoutSlashComments;
        if ((_a = this.previousLine) === null || _a === void 0 ? void 0 : _a.isEndingWithBlockComments) {
            text = `/*${text}`;
        }
        if (this.isEndingWithBlockComments) {
            text = `${text}*/`;
        }
        const splittedText = text.split(/\/\*.*\*\//);
        const zzz = splittedText.join('');
        // console.log('WITHOUT COMMENTSSS', this.textWithoutSlashComments, text, splittedText, zzz)
        return zzz;
    }
    get textWithoutSlashComments() {
        var _a, _b;
        const splittedText = (_b = (_a = this.text) === null || _a === void 0 ? void 0 : _a.split(/\/\//)) !== null && _b !== void 0 ? _b : '';
        if (splittedText.length === 1) {
            return this.text;
        }
        return this.text.slice(0, splittedText[0].length - 1);
    }
    /**
     * Sets the depth and nesting complexity to this CodeLine
     */
    setDepthAndNestingCpx() {
        var _a, _b, _c, _d, _e;
        this.cpxFactors.nesting = new nesting_cpx_model_1.NestingCpx();
        this.cpxFactors.depth = new depth_cpx_model_1.DepthCpx();
        for (const astNode of this.astNodes) {
            if (astNode.intrinsicNestingCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_a = astNode.cpxFactors) === null || _a === void 0 ? void 0 : _a.depth);
                this.cpxFactors.nesting = tools_service_1.addObjects(this.cpxFactors.nesting, (_c = (_b = astNode.parent) === null || _b === void 0 ? void 0 : _b.cpxFactors) === null || _c === void 0 ? void 0 : _c.nesting);
            }
            if (astNode.intrinsicDepthCpx > 0) {
                this.cpxFactors.depth = tools_service_1.addObjects(this.cpxFactors.depth, (_e = (_d = astNode.parent) === null || _d === void 0 ? void 0 : _d.cpxFactors) === null || _e === void 0 ? void 0 : _e.depth);
            }
        }
    }
}
exports.CodeLine = CodeLine;
_code = new WeakMap(), _isEndingWithBlockComments = new WeakMap();
