"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexMock = void 0;
class RegexMock {
    shortRegex() {
        return /[^.[\]]+/g;
    }
    email() {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    }
    frenchPhoneNumber() {
        return /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    }
}
exports.RegexMock = RegexMock;
