


export class DebugMock  {

    opened;
    setVersionSelected;


    /**
     * Initialization
     */
    ngOnInit() {
        // ---
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    }
}
