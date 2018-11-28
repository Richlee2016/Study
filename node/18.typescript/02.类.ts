// 属性 与 方法 的种类
class Person {
  static nice:string = 'richlee'
  public name: string; //都可以访问
  protected age: number;//可以在 子类访问
  private money: number; //只能在  Person 类中访问
  constructor(name: string,age:number,money:number) {
    this.name = name;
    this.age = age;
    this.money = money;
  }
}

class Rich extends Person {
    constructor(name:string,age:number,money:number){
        super(name,age,money)
    }
    sayAge(){
        console.log(this.age);
    }
}

let rich = new Rich('richlee',26,1001000)


console.log(Rich.nice);

// 类的 get set 方法
let passcode = "secret passcode";
class Employee {
    private _fullName: string = "";

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}

// 抽象类  不同于接口，抽象类可以包含成员的实现细节
abstract class Box {
    abstract color:string;
    asyage(age:number):void {
        console.log(age);
    }
    abstract sayName(name:string):void;
}

class Club extends Box {
    public color:string = 'red';
    sayName(name:string):void {
        console.log(name,this.color);
    }
}

let club = new Club()
club.sayName('club box')


