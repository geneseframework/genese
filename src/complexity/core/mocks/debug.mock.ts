


export class DebugMock  {

    opened;
    setVersionSelected;

    /**
     * Indentation
     */
    ngOnInit() {
        // ---
        let a = 3; // comment
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    } test() {

    }
}
