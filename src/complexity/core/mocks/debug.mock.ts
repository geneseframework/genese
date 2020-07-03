


export class DebugMock  {

    opened;
    setVersionSelected; ngOnInit() {
        // ---
        let a = 3;
        setTimeout(() => this.opened = true);
        this.setVersionSelected();
    }
}
