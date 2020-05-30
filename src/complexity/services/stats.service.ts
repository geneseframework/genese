import { TreeFolder } from '../models/tree-folder.model';
import { TreeFile } from '../models/tree-file.model';
import { Stats } from '../models/stats.model';

/**
 * Abstract class managing statistics of files or folders
 */
export abstract class StatsService {

    protected abstract _stats: Stats = undefined;                                       // The statistics of the TreeFile or the TreeFolder
    protected abstract calculateStats(fileOrFolder: TreeFile | TreeFolder): void;       // The method calculating the statistics
    protected abstract getNameOrPath(element: TreeFile | TreeFolder): void;                                           // The method returning the filename or the folder's path


    /**
     * Calculates and returns all the statistics
     * @param fileOrFolder      // The file or folder to analyse
     */
    getStats(fileOrFolder: TreeFile | TreeFolder): Stats {
        if (this._stats) {
            return this._stats
        } else {
            this._stats = new Stats();
            this.calculateStats(fileOrFolder);
            this.getNameOrPath(fileOrFolder);
            this._stats.setPercentages();
            this._stats.cumulateComplexities();
            this.sortBarCharts();
            return this._stats.plugChartHoles();
        }
    }


    /**
     * Sorts the barCharts by increasing complexity
     */
    sortBarCharts() {
        this._stats.barChartCognitive = this._stats.barChartCognitive.sort();
        this._stats.barChartCyclomatic = this._stats.barChartCyclomatic.sort();
    }
}
