# Genese Complexity

Genese Complexity is a part of the [genese framework]('https://github.com/geneseframework/genese') which improves you to increase your code quality by analysing the cognitive complexity and the cyclomatic complexity of all the Typescript files of your project.
This module creates an HTML report displaying the complexities scores of each folder, file or method which will give you an overview of the code quality of your project. Moreover, you will find for each method the reasons of the complexity score which will help you to refactor your code more easily.


![Dashboard Genese Complexity](./readme-dashboard.png?raw=true "Dashboard")

## Table of Contents
* [Why use Genese Complexity ?](#why-use-genese-complexity-)
* [Installation](#installation)
* [Usage](#usage)
* [Interpretation of results](#interpretation-of-results)


## Why use Genese Complexity ?

Genese Complexity is an audit tool which allows you to identify quickly the bad practices concerning cognitive or cyclomatic complexity. You will be able to find quickly the methods with too high complexity score (error) or which are near this threshold (warning) and fix the different bad smells.

## Installation

Genese complexity is a part of the genese module itself, so if you installed globally genese yet, you have nothing to do. If not, please install globally the genese module :

```sh 
npm i -g genese
```

## Usage

Genese complexity is launched with the Genese CLI included in the genese module. The main command-line is

```sh 
genese cpx [directory]
```

The "directory" param is the folder of the project to audit. It can be relative or absolute.

***Example :***
```sh 
genese cpx ./src/
```

Please note that the slash at the end of the path is mandatory.

This command line will generate a report in the folder `genese/complexity/reports` (it can be customized) named `folder-report.html`. You just need to open it in a browser to display the results.

## Interpretation of results

The dashboard's header presents the global statistics of the analyzed project. These scores will give you an overview of its size.

The main part of the page consist in two pairs of charts : the left one is about cognitive complexity and the other is about cyclomatic complexity. The "doughnut chart" is an overview of the distribution of the project's methods statuses (correct, warning and error). The information on the left are reminding these thresholds (which can be customized).
 
