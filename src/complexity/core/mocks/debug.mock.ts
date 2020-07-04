
class MultiLanguageTab {
    lang;
}

class Language {
    static en;
}

export class DebugMock  {

    currentLanguage;
    changeCurrentLanguage;


    changeTab(multiLanguageTab: MultiLanguageTab): void {
        this.currentLanguage = multiLanguageTab.lang;
        this.changeCurrentLanguage.emit(multiLanguageTab ? multiLanguageTab.lang : Language.en);
    }
}
