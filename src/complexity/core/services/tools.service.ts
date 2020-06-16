/**
 * Capitalize the given string (i.e. convert the string to upper lower case).
 * @param {string} text - The text to capitalize.
 * @return {string}
 */
import { TConstructor } from '../../ast-to-reports/interfaces/t-constructor.interface';


export function capitalize(text: string): string {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}


/**
 * Returns the result of a fraction in percentage with 2 decimals
 * @param numerator         // The numerator of the fraction
 * @param denominator       // The denominator of the fraction
 */
export function percent(numerator: number, denominator: number): number {
    if (!denominator) {
        return 0;
    }
    return  Math.round(numerator * 1000 / denominator) / 10;
}


export function addObjects<T>(first: T, second: T, tConstructor?: TConstructor<T>): T {

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
        } else if (typeof first[key] === 'object' && typeof second[key] === 'object') {
            t[key] = addObjects(first[key], second[key]);
        } else {
            t[key] = undefined;
        }
    }
    return t as T;
}

