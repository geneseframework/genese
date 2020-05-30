# Genese

Genese is a typescript framework containing different tools which will improve your speed of development and increase your code quality. Some of these tools are accessible with command lines with the genese package itself, like `genese-complexity`. Other tools are available in separate modules, like `genese-angular` or `genese-api`. 


## 1. Installation

Please install globally the npm module:

```sh
npm i -g genese
```

## 2. Genese CLI

### 2.1 Genese API

Genese API modules are code generators which allows you to generate data-services and DTO models from an OpenAPI file.

#### 2.1.1 Genese API for Angular

The genese-api-angular module is the declination of Genese API for Angular apps.

After installing globally Genese, you'll can launch the creation of the data-services and of the DTO models with a simple command-line :

```sh
genese new api
```

You will find more information in the [genese-api-angular documentation](https://github.com/gillesfabre34/genese-api-angular).

A demonstrator of genese-api-angular is available [here](https://github.com/geneseframework/genese-api-angular-demo).

### 2.2 Genese Complexity

The Genese Complexity module analyzes the cognitive complexity and the cyclomatic complexity of Typescript projects.

After installing globally Genese, you'll can launch the analysis with this command-line :

```sh
genese cpx [pathDir]
```

You will find more information in the [genese-complexity documentation](https://github.com/geneseframework/genese/tree/develop/src/complexity).

## 3 Genese modules

### 3.1 Data-services

#### 3.1.1 genese-angular

The genese-angular module is an Angular library which allows you to call http requests and receive response formatted with the type of your DTO, without implementing any data-service or mapper. It decreases the number of lines of code and the quantity of unit tests to realize, and increase your code quality by receiving directly in your components the response objects with the correct type and with default values.

Installation :

```sh
npm i genese-angular
```

You will find more information in the [genese-angular documentation](https://github.com/geneseframework/genese-angular).

A demonstrator of genese-angular is available [here](https://github.com/geneseframework/genese-angular-demo).

### 3.2 Mappers

#### 3.2.1 genese-mapper

The genese-mapper module allows you to map objects with unknown type in objects with the type expected. This module is used by the genese data-services modules as genese-angular.

Installation :

```sh
npm i genese-mapper
```

You will find more information in the [genese-mapper documentation](https://github.com/geneseframework/genese-mapper).


