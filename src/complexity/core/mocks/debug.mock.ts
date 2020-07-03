


export class DebugMock  {

    opened;
    setVersionSelected;

    /**
     * Indentation
     */
    ngOnInit() {
        // ---
        let a = 3;
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    } test() {

    }
}
