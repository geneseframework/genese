import { Barchart } from '../models/barchart.model';

export class BarchartService {

    static concat(chart1: Barchart, chart2: Barchart): Barchart {
        if (!chart2) {
            return chart1;
        }
        for (const point of chart2.data) {
            chart1 = chart1.addResult(point.x, point.y);
        }
        return chart1;
    }

}
