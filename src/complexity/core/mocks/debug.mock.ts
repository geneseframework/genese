


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



    /**
     * set the version
     */
    // setVersionSelected() {
    //     this.versionsDataService.getVersions(this.versionUrl).subscribe(
    //         (versions: Version[]) => {
    //             this.setVersions(versions);
    //             // If no version number is selected, we select the last.
    //             if (!this.selectedVersionNumber) {
    //                 this.selectedVersionNumber = Math.max(...versions.map(o => o.versionNumber));
    //             }
    //         }
    //     );
    // }
    //
    //
    // /**
    //  * set Versions
    //  * @param versions
    //  */
    // setVersions(versions: Version[]) {
    //     this.versions = versions;
    // }
    //
    //
    // /**
    //  * Select an other versions
    //  * @param version
    //  */
    // selectVersion(version: Version) {
    //     if (version && version.versionNumber) {
    //         this.selectedVersionNumberChange.emit({versionNumber: version.versionNumber, latest: version.latest});
    //         this.closeSideMenu();
    //     }
    // }
    //
    //
    // /**
    //  * CloseSideMenu
    //  */
    // closeSideMenu() {
    //     if (this.opened) {
    //         this.closing.emit(true);
    //     }
    // }
}
