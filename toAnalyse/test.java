public class Application {
    double somme_2(double a, double b, double c) {
        int e = a + b;
        b = a + 3;
        if (a > c) {
            return a + b * c * 2;
        }
        while (!b) {
            a = a + b;
        }
        do {
            a = a + b;
        } while (a && !b);
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

    void testHashMap() {
        Map<String, Integer> items = new HashMap<>();
        items.put("A", 10);
        items.put("B", 20);
        items.put("C", 30);
        items.put("D", 40);
        items.put("E", 50);
        items.put("F", 60);

        for (Map.Entry<String, Integer> entry : items.entrySet()) {
            System.out.println("Hello world");
        }
    }


}
