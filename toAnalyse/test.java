public class Application {

    public void test0() {
        let a = z();
        int b = y.z();
        int c = x.y.z();
        int d = w.x.y.z();
        int e = y().z();
        int f = x().y.z();
        int g = x().y().z();
        int h = this.z();
        int i = this.y.z();
        int j = Class.z();
        int k = Class.y.z();
    }

    public void CountryControlReason(Country country, ControlReasonCode reasonCode, LocalDate date) {
       this.country = country;
       this.reasonCode = reasonCode;
       this.date = date;
       this.countryId = country.getId();
    }

    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
       String date = p.getText();
       DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
       LocalDateTime formatDateTime = LocalDate.parse(date, formatter).atStartOfDay();

       return formatDateTime;
    }

    public void test1() {
        List<String> items = new ArrayList<>();
        items.add("A");
        items.add("B");
        items.add("C");
        items.add("D");
        items.add("E");

        for(String item : items){
            System.out.println(item);
        }
    }

    public void test2() {
        Map<String, Integer> items = new HashMap<>();
        items.put("A", 10);
        items.put("B", 20);
        items.put("C", 30);
        items.put("D", 40);
        items.put("E", 50);
        items.put("F", 60);

        for (Map.Entry<String, Integer> entry : items.entrySet()) {
            System.out.println("Item : " + entry.getKey() + " Count : " + entry.getValue());
        }
    }

    public void test3() {
        Vector<Integer> v = new Vector<Integer>(n);
        for (int i = 1; i <= n; i++)
             v.add(i);
    }

    public void test4() {
        LinkedList<String> list=new LinkedList<String>();
        list.add("Steve");
        list.add("Carl");
        list.add("Raj");

        list.addFirst("Negan");
        list.addLast("Rick");
        list.add(2, "Glenn");

        Iterator<String> iterator=list.iterator();
        while(iterator.hasNext()){
          System.out.println(iterator.next());
        }
    }

    public void test5() {
        Set<String> daysOfWeek = new HashSet<>();
        daysOfWeek.add("Monday");
        daysOfWeek.add("Tuesday");
        daysOfWeek.add("Wednesday");
        daysOfWeek.add("Thursday");
        daysOfWeek.add("Friday");
        daysOfWeek.add("Saturday");
        daysOfWeek.add("Sunday");
        daysOfWeek.add("Monday");
    }

    public void test6() {
        for (RegulationLicense b : RegulationLicense.values()) {
            if (b.getDescription().equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }

    public void test7() {
        try {
           writeOnFileSystem(media, stream);
        } catch (IOException e) {
           throw new TechnicalError("Couldn't write file " + filename);
        }
    }

    public void test8() {
        try {
           claims = jwtService.parseToken(token);
        } catch (JwtException ex) {
           log.info("Invalid token : "+ex.getMessage());
           return null;
        }
    }

    public void test9() {
        try {
           return json.get("token").asText();
        } catch (IOException | RestClientException e) {
           throw new TechnicalError("Unable to login to EcLabs", e);
        }
    }

    public void test10() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication().getToken();
    }

    public void test11() {
        double tailleMoyenneDesHommes = employes
                .stream()
                .filter(e -> e.getGenre() == Genre.HOMME)
                .mapToInt(e -> e.getTaille())
                .average()
                .orElse(0);
    }
}


