public class Application {
    int somme(int a, int b) {
        if(a < b) {
          return a * b;
        } else {
            if (!a) {
                return a + b;
            }
            return a - b;
        }
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

    int tryCatchSomme(int a, int b) {
        try {
            a = 1;
        }
        while (!b) {
            a = a + b;
        }
        do {
            a = a + b;
        } while (a && !b);
    }
}
