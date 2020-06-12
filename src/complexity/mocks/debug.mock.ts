export class DebugMock {


    ifAlone(a) {
        if (a) {
            return 'b';
        }
        const obj = {
            id: 42,
            counter: function counter() {
                setTimeout(function() {
                    console.log(this.id);
                }.bind(this), 1000);
            }
        };
    }

}
