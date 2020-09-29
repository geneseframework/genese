public class Application {
    int somme(int a, int b) {
        try {
            System.out.println("Hello IN!");
        }
        catch(Exception e) {
            System.out.println("Hello OUT!");
        }finally{
            System.out.println("Hello FINALLY!");
        }
        return 1;

    }

}
