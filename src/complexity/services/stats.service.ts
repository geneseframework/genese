import { TreeFolder } from '../models/tree-folder.model';
import { TreeFile } from '../models/tree-file.model';
import { Stats } from '../models/stats.model';

export abstract class StatsService {

    protected abstract _stats: Stats = undefined;
    protected abstract calculateStats(fileOrFolder: TreeFile | TreeFolder): void;
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
            return this._stats.plugChartHoles();
        }
    }


    sortBarCharts() {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    }
}
