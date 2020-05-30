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

### Folder reports

The dashboard's header presents the global statistics of the analyzed project. These scores will give you an overview of its size.

The main part of the page consist in two pairs of charts : the left one is about cognitive complexity and the other one about cyclomatic complexity. The "doughnut chart" is an overview of the distribution of the project's methods statuses (correct, warning and error). The information on the left are reminding warning and error thresholds (which can be customized), and display the number of methods by status.
 
 The bar charts display the number of methods by complexity score. The first array displays the detailed information of each subfolder of the current one. The second presents informations of the files inside the current folder (but not the files inside its subfolders), and the third array displays the complexity scores of each method of each file located in the current folder or its subloders, sorted by decreasing cognitive complexity score.
 
 ### File reports
 
 As folder reports, the file reports display complexity statistics of its methods. In addition, you will find detailed information of each of its methods, with explanations of the calculation mode of their cognitive complexity.
 
 ## Configuration
 
 Some parameters are configurable by creating a file geneseconfig.json located on the folder where you will enter the command-line. This file must have this form :
 
 ```json 
{
    "complexity": {
        "option": value
    }
} 
```
 
 ### Thresholds
 
 You can customize the warning and error thresholds of each kind of complexity like this :
 
 ```json 
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 15, 
            "warningThreshold": 10
        },
        "cyclomaticCpx": {
            "errorThreshold": 15,
            "warningThreshold": 10
        },
    }
} 
```

The values by default are :

 ```json 
{
    "complexity": {
        "cognitiveCpx": {
            "errorThreshold": 10 
            "warningThreshold": 5
        },
        "cyclomaticCpx": {
            "errorThreshold": 10
            "warningThreshold": 5
        },
    }
} 
```

### Folders to ignore

You can ignore some folders like this :

```json
{
    "complexity": {
        "ignore": [
            ".git",
            ".idea",
            "api",
            "/node_modules",
            "./genese"
        ]
    }
}
``` 

The folders ignored by default are `/node_modules` and `./genese`.

### Path of folder to analyse

By default, the folder to analyse is the folder where you enter the command-line. You can change it like this :

```json
{
    "complexity": {
        "pathFolderToAnalyze": "./src/"
    }
}
``` 

The last character must be a slash.

### Reports path

By default, the genese complexity report will be located here : `current_folder/genese/`. You can change it like this:

```json
{
    "complexity": {
        "pathReports": "./my-report-folder"
    }
}
```

## Documentation

### Cyclomatic complexity

The cyclomatic complexity represents the difficulty to test a given method. The cyclomatic score is a measure of the testability and the maintainability of your code. This score gives you a first indication about the measure of the time of development needed to test your code and to increase its maintainability.

The force of the cyclomatic complexity concept is its simplicity: approximately, all breakflows (for, if, switch, ...) increase the score of 1. This simplicity is giving you an objective overview of the quality of your code, without subjective interpretations. Unfortunately, this lack of subjectivity involves the low relevance of the cyclomatic complexity score when you want to measure the ***real*** maintainability of your code. If you want to be sure that your code will be easy to maintain, you must ask you this question: ***as a developer**, would it be easy to understand a code like this ?

If you are a human, you will read your code differently than a machine would do it. That's why we need to add more parameters to calculate the real maintainability of your code, and these parameters will contain a part of subjectivity. The measure of the understandability of you code is given by the cognitive complexity which is described below. 

### Cognitive complexity

The cognitive complexity could be defined as "a measure of the cognitive effort to understand some code". 

A project is maintainable if each file and each method is easily understandable; that's why the cognitive complexity should be seen as the most important indicator of code maintainability.

The definition above is perfect, but needs to be clarified. The "cognitive effort" is a concept easy to understand, but complex to define. There is no scientific definition of this concept : what is complex to understand and what is not ? Is an "if - else" more complex than a "for", a "while" or a "switch" ? How many times a recursive method is more complex than a "normal" one ? Shorthands like optional chaining or nullish coalescing clearly decrease the complexity of a method, but in which proportion ? There are no indisputable responses. We are condemned to weight each complexity factor with an arbitrary value which corresponds to our intuition.

The first try to define algorithmic rules allowing to calculate the cognitive complexity was done by Ann Campbell for SonarCloud in 2017. She used three basic rules to calculate the cognitive complexity score :

      1. Ignore structures that allow multiple statements to be readably shorthanded into one
      2. Increment (add one) for each break in the linear flow of the code
      3. Increment when flow-breaking structures are nested

This calculation method involves the following elements :

* Increment for breaks in the linear flow

    - Loop structures : for, while, do while, ... : + 1
    - Conditionals : ternary operators, if, ... : + 1
    - else, else if, ... : + 1 
    - catch : + 1 ("try" and "finally" are ignored)
    - switch : + 1 
    - logic doors : + 1 for the first one and + 1 for the next one if different of the previous one (a && b => +1 ; a && b && c => + 1 ; a && b || c => + 2)
    - recursion : + 1   

* Increment for nesting structures

    - Loop structures : for, while, do while, ... : + 1
    - Conditionals : ternary operators, if, ... : + 1
    - else, else if, ... : 0 (no nesting increment because *"the mental cost has already been paid when reading the if"*.
    - catch : + 1 ("try" and "finally" are ignored)
    - switch : + 1 (globally, not for each "case")
    - logic doors : 0   
    - recursion : 0   



