public class Application {
    int somme(int a, int b) {
        this.somme(a, b);
    }

    int tryCatchSomme(int a, int b) {
        try {
            a = 1;
        }
        catch(Exception e) {
            a = 2;
        }finally{
            a = 3;
        }
        return a;

    }

}
