


export class DebugMock  {

    /**
     * Transform string format from PascalCase to snake-case
     * @param word
     */
    static toSnakeCase(word: string): string {
        if (!word) {
            return '';
        }
        let snake = word.charAt(0).toLowerCase();
        for (let i = 1; i < word.length; i++) {
            if (word.charAt(i) === word.charAt(i).toUpperCase()) {
                snake += '-' + word.charAt(i).toLowerCase();
            } else {
                snake += word.charAt(i);
            }
        }
        return snake;
    }
}
