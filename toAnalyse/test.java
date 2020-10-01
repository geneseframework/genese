public class Application {

//   int x;  // Create a class attribute

//   // Create a class constructor for the MyClass class
//   public Application() {
//     this.x = 5;  // Set the initial value for the class attribute x
//   }
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
