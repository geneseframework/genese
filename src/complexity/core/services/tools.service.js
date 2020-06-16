"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addObjects = exports.percent = exports.capitalize = void 0;
function capitalize(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
exports.capitalize = capitalize;
/**
 * Returns the result of a fraction in percentage with 2 decimals
 * @param numerator         // The numerator of the fraction
 * @param denominator       // The denominator of the fraction
 */
function percent(numerator, denominator) {
    if (!denominator) {
        return 0;
    }
    return Math.round(numerator * 1000 / denominator) / 10;
}
exports.percent = percent;
function addObjects(first, second, tConstructor) {
    if (!(typeof first === 'object') || !(typeof second === 'object')) {
        return first;
    }
    const t = tConstructor ? new tConstructor() : {};
    for (const key of Object.keys(first)) {
        if (!second[key]) {
            t[key] = first[key];
        }
        if (typeof first[key] === 'number') {
            t[key] = (typeof second[key] === 'number') ? first[key] + second[key] : first[key];
        }
        else if (typeof first[key] === 'object' && typeof second[key] === 'object') {
            t[key] = addObjects(first[key], second[key]);
        }
        else {
            t[key] = undefined;
        }
    }
    return t;
}
exports.addObjects = addObjects;
