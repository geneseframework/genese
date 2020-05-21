"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CymsMock {
    constructor() { }
    /**
     * Insert a value in an object for a given path
     * @param object The object where we want to set a thing
     * @param path the path were we want insert the thing
     * @param value the thing to insert
     * @returns {Object}
     */
    set(object, path = '', value) {
        if (!object) {
            return undefined;
        }
        if (!Array.isArray(path)) {
            path = path.toString().match(/[^.[\]]+/g) || [];
        }
        path.slice(0, -1)
            .reduce((acc, curr, index) => this.reducer(acc, curr, index, +path), object)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return object; // Return the top-level object to allow chaining
    }
    reducer(acc, curr, index, path) {
        return Object(acc[curr]) === acc[curr] ? acc[curr] : (acc[curr] = isNaN(+path[index + 1]) ? {} : []);
    }
    /**
     * Keep the incidents count up to date
     * And set the top buttons labels
     * @returns {void}
     */
    setCountByStatusText() {
        var _a;
        const { target_capacity: capacity, target_high_capacity: highCapacity } = this.incidentsListService.filters;
        // const CAPACITY = capacity
        //     ? this.capacityService.getCapacityConfig(highCapacity, capacity)
        //     : this.capacityService.getHighCapacityConfig(highCapacity);
        for (const tb of this.incidentsListService || []) {
            tb.text = `${((_a = this.CAPACITY) === null || _a === void 0 ? void 0 : _a.label) || this.LABELS.ALL} - ${this.LABELS[tb.status]} (${this.countByStatus[tb.status]})`;
        }
    }
    /**
     * Get an item from local storage
     * @param key the ke yof the item
     * @param parse boolean to know if we parse the item or not
     * @returns {any}
     */
    getFromLocalStorage(key, parse = true) {
        const item = localStorage.getItem(key);
        return parse ? JSON.parse(item) : item;
    }
    /**
     * Set an item in the local storage
     * @param key the key of the item
     * @param item the item
     * @returns {void}
     */
    setToLocalStorage(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    }
    /**
     * Check if a date is after an other
     * @param date1 the concerned date
     * @param date2 the other date
     * @returns {boolean}
     */
    dateIsAfter(date1, date2) {
        const UTC_DATE_1 = new Date(date1).getTime();
        const UTC_DATE_2 = new Date(date2).getTime();
        if (isNaN(UTC_DATE_1) || isNaN(UTC_DATE_2)) {
            return true;
        }
        else {
            return UTC_DATE_1 - UTC_DATE_2 > 0;
        }
    }
    /**
     * Get the date format in ZULU
     * @returns {string}
     */
    getZuluDate(date = new Date()) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        const DAY = `${date.getUTCDate() < 10 ? '0' : ''}${date.getUTCDate()}`;
        const MONTH = `${date.getUTCMonth() < 10 ? '0' : ''}${date.getUTCMonth() + 1}`;
        const YEAR = `${date.getUTCFullYear()}`;
        return `${DAY}/${MONTH}/${YEAR}`;
    }
    /**
     * Get the time format in ZULU
     * @returns {string}
     */
    getZuluTime(time = new Date()) {
        if (!(time instanceof Date)) {
            time = new Date(time);
        }
        const HOURS = `${time.getUTCHours() < 10 ? '0' : ''}${time.getUTCHours()}`;
        const MINUTES = `${time.getUTCMinutes() < 10 ? '0' : ''}${time.getUTCMinutes()}`;
        const SECONDS = `${time.getUTCSeconds() < 10 ? '0' : ''}${time.getUTCSeconds()}`;
        return `GMT ${HOURS}:${MINUTES}:${SECONDS} Z`;
    }
}
exports.CymsMock = CymsMock;
