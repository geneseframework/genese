"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    /**
     * Initialization
     */
    ngOnInit() {
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    }
}
exports.DebugMock = DebugMock;
