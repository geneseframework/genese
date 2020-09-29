public class Application {
    int somme(int a, int b) {
        try {
        //  Block of code to try
            System.out.println("Hello IN!");
        }
        catch(Exception e) {
        //  Block of code to handle errors
            System.out.println("Hello OUT!");
        }
        return 1;
        // if(a < b) {
        //   return a * b;
        // } else {
        //     if (!a) {
        //         return a + b;
        //     }
        //     return a - b;
        // }
    }

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
}
