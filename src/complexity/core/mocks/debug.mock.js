"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugMock = void 0;
class MultiLanguageTab {
}
class Language {
}
class DebugMock {
    changeTab(multiLanguageTab) {
        this.currentLanguage = multiLanguageTab.lang;
        this.changeCurrentLanguage.emit(multiLanguageTab ? multiLanguageTab.lang : Language.en);
    }
}
exports.DebugMock = DebugMock;
