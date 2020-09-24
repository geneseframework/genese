public class Application {
    int somme(int a, int b) {
        if(a < b) {
          return a * b;
        } else {
            if (b == a) {
                return a + b;
            }
            return a - b;
        }
    }

    double somme_2(double a, double b, double c) {
        if (a > c) {
            return a + b * c * 2;
        }
    }
}
