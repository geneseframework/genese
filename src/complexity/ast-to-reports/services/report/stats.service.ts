import { Stats } from '../../models/stats.model';
import { AstFile } from '../../../core/models/ast/ast-file.model';
import { AstFolder } from '../../../core/models/ast/ast-folder.model';

/**
 * Abstract class managing statistics of files or folders
 */
export abstract class StatsService {

    protected abstract _stats: Stats = undefined;                                       // The statistics of the AstFile or the AstFolder
    protected abstract calculateStats(fileOrFolder: AstFile | AstFolder): void;       // The method calculating the statistics
    protected abstract getNameOrPath(element: AstFile | AstFolder): void;                                           // The method returning the filename or the folder's path


    /**
     * Calculates and returns all the statistics
     * @param fileOrFolder      // The file or folder to analyse
     */
    getStats(fileOrFolder: AstFile | AstFolder): Stats {
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
