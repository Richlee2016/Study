declare class Person {
    static nice: string;
    name: string;
    protected age: number;
    private money;
    constructor(name: string, age: number, money: number);
}
declare class Rich extends Person {
    constructor(name: string, age: number, money: number);
    sayAge(): void;
}
declare let rich: Rich;
declare let passcode: string;
declare class Employee {
    private _fullName;
    fullName: string;
}
declare let employee: Employee;
declare abstract class Box {
    abstract color: string;
    asyage(age: number): void;
    abstract sayName(name: string): void;
}
declare class Club extends Box {
    color: string;
    sayName(name: string): void;
}
declare let club: Club;
