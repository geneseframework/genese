export class Tools {

    static percent(numerator: number, denominator: number): number {
        if (!denominator) {
            return 0;
        }
        return  Math.round(numerator * 1000 / denominator) / 10;
    }
}
