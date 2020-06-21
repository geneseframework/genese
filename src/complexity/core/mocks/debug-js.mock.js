var funcWithBinding = {
    id: 43,
    counter: function counter() {
        setTimeout(function() {
            console.log('funcWithBinding', this.id);
        }.bind(this), 1000);
    }
};
var funcWithBindingNested = {
    id: 43,
    nest: {
        counter: function counter() {
            setTimeout(function () {
                console.log('funcWithBinding', this.id);
            }.bind(this), 1000);
        }
    }
};
var funcWithoutBinding = {
    id: 43,
    counter: function counter() {
        setTimeout(function zzz() {
            console.log('funcWithoutBinding', this.id);
        }, 1000);
    }
};
var arrowFunction = {
    id: 43,
    counter: function counter() {
        setTimeout(() => {
            console.log('arrowFunction', this.id);
        }, 1000);
    }
};
var arrowFunction2 = {
    id: 43,
    test: {
        a: 3,
        counter: function counter() {
            setTimeout(() => {
                console.log('arrowFunction2', this.id);
            }, 1000);
        }
    }
};

function ctxt () {
    console.log(this);
}
var arrowCtxt = () => {
    console.log(this);
}

console.log(funcWithBinding.counter())
console.log(funcWithoutBinding.counter())
console.log(arrowFunction.counter())
console.log(arrowFunction2.test.counter())
