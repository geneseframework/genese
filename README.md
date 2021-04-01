
<p align="center">
    <img src="https://raw.githubusercontent.com/geneseframework/mapper/develop/docs/logo-genese-150x150.png" alt="genese logo">
</p>

# @genese

`@genese` is a tool suite composed by different modules which will improve your development velocity and increase your code quality. Some of these tools are accessible by command lines thanks to [@genese/cli](https://www.npmjs.com/package/genese-cli) module, like [@genese/complexity](https://www.npmjs.com/package/genese-complexity), and may be installed globally. Other tools are available as classic node-modules, like [@genese/mapper](https://www.npmjs.com/package/@genese/mapper), [@genese/angular](https://www.npmjs.com/package/genese-angular) or [@genese/api](https://www.npmjs.com/package/genese-api). 


## Table of Contents
* [Installation](#installation)
* [@genese/complexity](#genesecomplexity)
* [@genese/mapper](#genesemapper)
* [@genese/angular](#geneseangular)
* [@genese/api](#geneseapi)
* [@genese/cli](#genesecli)

## Installation

Each Genese module may be installed separately :

- [@genese/angular](https://www.npmjs.com/package/genese-angular)
- [@genese/api](https://www.npmjs.com/package/genese-api)
- [@genese/cli](https://www.npmjs.com/package/genese-cli)
- [@genese/complexity](https://www.npmjs.com/package/genese-complexity)
- [@genese/mapper](https://www.npmjs.com/package/@genese/mapper)

## @genese/complexity

[@genese/complexity](https://www.npmjs.com/package/genese-complexity) is a module which analyzes the code quality of a given project by analyzing its cyclomatic and cognitive complexities.
This module creates an HTML report displaying an overview of the complexities index of each folder, file or method of your project. Moreover, you will find for each method the elements increasing complexity index, which will help you to refactor easier your code.


![Dashboard Genese Complexity](readme-dashboard-cpx.png?raw=true "Dashboard")

[Top](#table-of-contents)
## @genese/mapper

`@genese/mapper` maps objects of unknown type into the required type.

### Basic usage

With [@genese/mapper](https://www.npmjs.com/package/@genese/mapper), you can transform untyped javascript objects into safe typed objects.

`@genese/mapper` exposes only one method, the `create()` method.

- Example 1 : creation of a typed object

```ts
export class Person {

    name: string;

    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

const data = {name: 'John'};
const person: Person = create(Person, data);    // person is a Person object
person.hello();                                 // log : 'Hello John !'
```

This is equivalent to :
```ts
const person: Person = new Person();
person.name = data.name;
```


- Example 2 : creation of a more complex object

Now, assume that `Person` is a little more complex :

```ts
export class Person {

    age: number;
    cat: Cat;
    firstname: string;
    lastname: string;

    hello(): void {
        console.log(`Hello ${this.name} !`);
    }
}

export class Cat {
    name: string;

    meaow(): void {
        console.log(`Meaow !`);
    }
}

const data = {
    age: 20,
    cat: {
        name: 'Molly'
    },
    firstname: 'John',
    lastname: 'Doe',
};
```

In this case, it would be sufficiently long to create manually the `Person` object :
```ts
const cat: Cat = new Cat();
cat.name = data.cat.name;

const person: Person = new Person();
person.age = data.age;
person.firstname = data.firstname;
person.lastname = data.lastname;

person.hello(); // => logs 'Hello John !'
person.cat.meaow(); // => logs 'Meaow !'
```

With `@genese/mapper`, you can do it in one line :

```ts
const person: Person = create(Person, data);    // Person object which contains a Cat object

person.hello();                                 // log: 'Hello John !'
person.cat.meaow();                             // log: 'Meaow !'
```
The `data` object may be as complex as you want, you will still need only one line to create a real object, including nested objects if necessary.

- Example 3 : validation of the data shape

The above usage simplifies the creation of known objects, the real power of `@genese/mapper` is to create safe typed objects even when you don't know the `data` value or even its shape.

Assume that you receive some `data` with unknown value or shape, like on http requests. You need to check the `data` shape and verify if its value respects your DTO contract :

```ts
interface PersonDto {
    name: string;
    skills: string[];
}
```

Without `@genese/mapper`, your controller in the backend could be written like this (example with NestJs) :

```ts
@Post()
addPerson(@Body() data: PersonDto) {
    if (isValid(data)) {
        addNewPersonToDataBase(data); // do some stuff
    }
}

isValid(data: any): data is PersonDto {
    return data
        && typeof data.name === 'string'
        && Array.isArray(data.skills)
        && data.skills.every(d => typeof d === 'string');
}
```

With @genese/mapper, you could simply do that :

```ts
@Post()
addPerson(@Body() data: PersonDto) {
    if (create('PersonDto', data)) { // create('PersonDto', data) is a PersonDto object if data is correct, undefined if not
        addNewPersonToDataBase(data);
    }
}
```
The `create()` method checks everything for you. If data value respects the contract of the interface `PersonDto` the `create()` method will return the `data` value. If data is incorrect, it will return `undefined`.

This method can be used with primitives, arrays, tuples, classes, interfaces, enums and types.

[Top](#table-of-contents)
## @genese/angular

[@genese/angular](https://www.npmjs.com/package/genese-angular) is an Angular library which replaces all the data-services of Angular applications. Thanks to `@genese/mapper`, it maps every data received from your http requests into the safe typed object that you'll need to use in your components.

### Basic usage

`@genese/angular` replaces the http requests located in your services, and replaces the mappers used to format data coming from the backend into typed objects.

Returning typed objects from your data-services to your components is fundamental : if you do not, your component could receive incorrect data from the backend, and your application could crash. However, even if the mappers are important, they are also long and fastidious to write. Moreover, if you write mappers, you'll need to write unit tests for them, and add some mock values to be able to do these tests...

So, what would you say if `@genese/angular` could do all of that for you ? Yes, that's right : `@genese/angular` calls the http requests for you, and uses `@genese/mapper` which will send you back objects automatically typed ! 

In the below example, that means that you can simply put the file `book-data.service.ts` in the garbage, with its associated test file `book-data.service.spec.ts`.

* Example

Actually, you probably have Angular data-services like this :

``book.model.ts``
```ts
export class Book = {
    id?: string;
    isAvailable?: boolean;
    name?: string;
    public editors?: [{
        name?: string,
        country.: string
    }];

    constructor() {}
}
```

``book-data.service.ts``
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookDataService {

    constructor(private http: HttpClient) {}

    mapToBook(data: any): Book {
        let book = new Book();
        if (data && data.id) {
            book.id = data.id;
            book.isAvailable : data.isAvailable ? data.isAvailable : false;
            book.name : data.name ? data.name : '';
            book.editors = [];
            if (Array.isArray(data.editors)) {
                for (let editor of data.editors) {
                    let newEditor = {};
                    newEditor.name = editor.name ? editor.name : '';
                    newEditor.country = editor.country ? editor.country : '';
                    book.editors.push(newEditor);
                }
            }
        }
        return book;
    }

    getOne(id: string): Observable<Book> {
        this.http.get('http://localhost:3000/' + id)
            .pipe(
                map((data: any) => {
                    return this.mapToBook(data);
                }
            )
    }

    getAll(): Observable<Book[]> {
        this.http.get('http://localhost:3000/')
            .pipe(
                map((data: any) => {
                    let books = [];
                    if (Array.isArray(data)) {
                        for (let element of data) {
                            books.push(this.mapToBook(element));
                        }
                    }
                    return books;
                }
            )
    }

    delete(id: string) {
        // call DELETE request and do some stuff
    }

    update(id: string) {
        // call PUT request and do some stuff
    }

    // other CRUD methods
}
``` 

With `@genese/angular`, you simply need to call `GeneseService` inside your components, like this :


Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('/books', '1').subscribe((book: Book) => {
         // book is the data returned by 
         // the request http://localhost:3000/books/1
         // and formatted with type Book
    });
}
```

With the `getOne()` method, you are sure to receive your data correctly formatted with Book's type. No data-services to write, and no unit tests to do.

[Top](#table-of-contents)
## @genese/api

[@genese/api](https://www.npmjs.com/package/genese-api) is a code generator for Angular and React apps which generates all your DTOs and data-services from you OpenApi (Swagger) file.

You simply need to create you OpenApi file and launch genese-api : all your DTOs and data-services will be automatically generated. Moreover, with the help of `@genese/mapper`, all these data-services will use and return typed objects corresponding to the schemas included in your OpenApi file.

`@genese/api` may be used in combination with `@genese/angular` to remove both the necessity to create DTOs, data-services and calls to http requests.


[Top](#table-of-contents)
## @genese/cli

[@genese/cli](https://www.npmjs.com/package/genese-cli) is a command line interface to ease the use of some `@genese` packages, like `@genese/complexity` or `@genese/api`.

More information on [the official documentation](https://www.npmjs.com/package/genese-cli).









