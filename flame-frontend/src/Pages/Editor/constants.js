export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
    c: "10.2.0",
    cpp: "10.2.0",
  };
  
  export const CODE_SNIPPETS = {
    javascript: `function greet(name) {
    console.log("Hello, " + name + "!");
  }
  
  greet("Faisal");`,
    typescript: `type Params = {
    name: string;
  }
  
  function greet(data: Params) {
    console.log("Hello, " + data.name + "!");
  }
  
  greet({ name: "Faisal" });`,
    python: `def greet(name):
      print("Hello, " + name + "!")
  
  greet("Faisal")`,
    java: `public class HelloWorld {
    public static void main(String[] args) {
      System.out.println("Hello World");
    }
  }`,
    csharp: `using System;
  
  namespace HelloWorld
  {
      class Hello
      {
          static void Main(string[] args)
          {
              Console.WriteLine("Hello World in C#");
          }
      }
  }`,
    php: `<?php
  
  $name = 'Faisal';
  echo $name;`,
    c: `#include <stdio.h>
  
  int main() {
      printf("Hello World in C");\n

      return 0;
  }`,
    cpp: `#include <iostream>
  
  int main() {
      std::cout << "Hello World in C++" << std::endl;
      return 0;
  }`,
  };
  