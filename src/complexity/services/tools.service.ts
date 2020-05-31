


/**
 * Capitalize the given string (i.e. convert the string to upper lower case).
 * @param {string} text - The text to capitalize.
 * @return {string}
 */
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

