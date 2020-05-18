import { TsFolder } from '../models/ts-folder.model';
import { TsFile } from '../models/ts-file.model';
import { Stats } from '../models/stats.model';

export abstract class StatsService {

    protected abstract _stats: Stats = undefined;
    protected abstract calculateStats(fileOrFolder: TsFile | TsFolder): void;
    protected abstract getSubject(): void;


    getStats(fileOrFolder: any): Stats {
        if (this._stats) {
            return this._stats
        } else {
            this._stats = new Stats();
            this.calculateStats(fileOrFolder);
            this.getSubject();
            this._stats.setPercentages();
            this._stats.cumulateComplexities();
            this.sortBarCharts();
            return this._stats;
        }
    }


    sortBarCharts() {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    }
}
