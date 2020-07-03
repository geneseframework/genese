


export class DebugMock  {

    opened;
    setVersionSelected;


    /**
     * Initialization
     */
    ngOnInit() {
        // ---
        let a = 3;
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    }
}
