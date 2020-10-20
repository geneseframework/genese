class Application {
    public void test(){
        let a = z();
        let b = y.z();
        let c = x.y.z();
        let d = w.x.y.z();
        let e = y().z();
        let f = x().y.z();
        let g = x().y().z();
        let h = this.z();
        let i = this.y.z();
        let j = Class.z();
        let k = Class.y.z();
    }
}
