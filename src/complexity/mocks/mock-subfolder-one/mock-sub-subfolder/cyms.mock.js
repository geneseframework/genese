"use strict";
exports.__esModule = true;
var CymsMock = /** @class */ (function () {
    function CymsMock() {
    }
    /**
     * Insert a value in an object for a given path
     * @param object The object where we want to set a thing
     * @param path the path were we want insert the thing
     * @param value the thing to insert
     * @returns {Object}
     */
    CymsMock.prototype.set = function (object, path, value) {
        var _this = this;
        if (path === void 0) { path = ''; }
        if (!object) {
            return undefined;
        }
        if (!Array.isArray(path)) {
            path = path.toString().match(/[^.[\]]+/g) || [];
        }
        path.slice(0, -1)
            .reduce(function (acc, curr, index) { return _this.reducer(acc, curr, index, +path); }, object)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return object; // Return the top-level object to allow chaining
    };
    CymsMock.prototype.reducer = function (acc, curr, index, path) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    };
    /**
     * Keep the incidents count up to date
     * And set the top buttons labels
     * @returns {void}
     */
    CymsMock.prototype.setCountByStatusText = function () {
        var _a;
        var _b = this.incidentsListService.filters, capacity = _b.target_capacity, highCapacity = _b.target_high_capacity;
        // const CAPACITY = capacity
        //     ? this.capacityService.getCapacityConfig(highCapacity, capacity)
        //     : this.capacityService.getHighCapacityConfig(highCapacity);
        for (var _i = 0, _c = this.incidentsListService || []; _i < _c.length; _i++) {
            var tb = _c[_i];
            tb.text = (((_a = this.CAPACITY) === null || _a === void 0 ? void 0 : _a.label) || this.LABELS.ALL) + " - " + this.LABELS[tb.status] + " (" + this.countByStatus[tb.status] + ")";
        }
    };
    /**
     * Get an item from local storage
     * @param key the ke yof the item
     * @param parse boolean to know if we parse the item or not
     * @returns {any}
     */
    CymsMock.prototype.getFromLocalStorage = function (key, parse) {
        if (parse === void 0) { parse = true; }
        var item = localStorage.getItem(key);
        return parse ? JSON.parse(item) : item;
    };
    /**
     * Set an item in the local storage
     * @param key the key of the item
     * @param item the item
     * @returns {void}
     */
    CymsMock.prototype.setToLocalStorage = function (key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    };
    /**
     * Check if a date is after an other
     * @param date1 the concerned date
     * @param date2 the other date
     * @returns {boolean}
     */
    CymsMock.prototype.dateIsAfter = function (date1, date2) {
        var UTC_DATE_1 = new Date(date1).getTime();
        var UTC_DATE_2 = new Date(date2).getTime();
        if (isNaN(UTC_DATE_1) || isNaN(UTC_DATE_2)) {
            return true;
        }
        else {
            return UTC_DATE_1 - UTC_DATE_2 > 0;
        }
    };
    /**
     * Get the date format in ZULU
     * @returns {string}
     */
    CymsMock.prototype.getZuluDate = function (date) {
        if (date === void 0) { date = new Date(); }
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        var DAY = "" + (date.getUTCDate() < 10 ? '0' : '') + date.getUTCDate();
        var MONTH = "" + (date.getUTCMonth() < 10 ? '0' : '') + (date.getUTCMonth() + 1);
        var YEAR = "" + date.getUTCFullYear();
        return DAY + "/" + MONTH + "/" + YEAR;
    };
    /**
     * Get the time format in ZULU
     * @returns {string}
     */
    CymsMock.prototype.getZuluTime = function (time) {
        if (time === void 0) { time = new Date(); }
        if (!(time instanceof Date)) {
            time = new Date(time);
        }
        var HOURS = "" + (time.getUTCHours() < 10 ? '0' : '') + time.getUTCHours();
        var MINUTES = "" + (time.getUTCMinutes() < 10 ? '0' : '') + time.getUTCMinutes();
        var SECONDS = "" + (time.getUTCSeconds() < 10 ? '0' : '') + time.getUTCSeconds();
        return "GMT " + HOURS + ":" + MINUTES + ":" + SECONDS + " Z";
    };
    return CymsMock;
}());
exports.CymsMock = CymsMock;
