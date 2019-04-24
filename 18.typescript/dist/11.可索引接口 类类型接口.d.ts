interface Animal {
    name: string;
    eat(str: string): void;
}
declare class Dog implements Animal {
    name: string;
    constructor(name: string);
    eat(): void;
}
declare var d: Dog;
declare class Cat implements Animal {
    name: string;
    constructor(name: string);
    eat(): void;
}
declare var c: Cat;
