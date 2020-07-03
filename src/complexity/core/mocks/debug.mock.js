"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class DebugMock {
    /**
     * Transform string format from PascalCase to snake-case
     * @param word
     */
    static toSnakeCase(word) {
        if (!word) {
            return '';
        }
        let snake = word.charAt(0).toLowerCase();
        for (let i = 1; i < word.length; i++) {
            if (word.charAt(i) === word.charAt(i).toUpperCase()) {
                snake += '-' + word.charAt(i).toLowerCase();
            }
            else {
                snake += word.charAt(i);
            }
        }
        return snake;
    }
}
exports.DebugMock = DebugMock;
