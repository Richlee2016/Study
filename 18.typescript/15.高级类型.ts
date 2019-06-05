/*
高级类型

this类型
索引类型
映射类型
条件类型
*/

/**类型别名 */

type Nice = {
  age: number;
  name: string;
};

type Fun<T> = {
  age: number;
  name: T;
  Child?: Fun<T>;
};

// type  与  interface
// 需要扩展的时候  使用  extends   使用interface
// 需要用到元组 的时候使用 type

// 元组
type TupleType = [string,number]

const tupleBox:TupleType = ['rich', 23]

const box: Fun<number> = { age: 1, name: 321, Child: { age: 1, name: 3 } };

/** 字面量  数字字面量*/

type Name = "rich";

const name1: Name = "rich";

type Age = 18;
const age: Age = 18;

interface People {
  name: string;
  age: Age;
}

const people: People = {
  name: "rich",
  age: 18
};

/** 可辨识联合
 * 1.要具有普通的单例类型属性
 * 2.一个类型别名包含了那些类型的联合
 */

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape1 = Square | Rectangle | Circle;

function assetNever(value: never): never {
  throw new Error("fuck" + value);
}

function getArea(s: Shape1): number {
  switch (s.kind) {
    case "square":
      console.log("square");
      return s.size;
      break;
    case "rectangle":
      console.log("rectangle");
      return s.height;
      break;
    case "circle":
      console.log("circle");
      return s.radius;
      break;
  }
}

/** this 类型 */

class Counter {
  constructor(public count: number = 0) {}

  public add(value: number) {
    this.count += value;
    return this;
  }
  public subtract(value: number) {
    this.count -= value;
    return this;
  }
}

let con = new Counter(10);
con.add(1).subtract(2); //返回 this  产生链式调用

class Mathgo extends Counter {
  constructor(public count: number = 0) {
    super(count);
  }
  public pow(value: number) {
    this.count = this.count ** value;
    return this;
  }
}

let newcon = new Mathgo(3);
newcon
  .pow(3)
  .add(1)
  .subtract(4);

/**
 * 索引类型查询  keyof
 */

interface Info {
  name: string;
  age: number;
}
// key 的索引 类型
let infoprop: keyof Info;
infoprop = "name";
infoprop = "age";

function getValue<T, K extends keyof T>(obj: T, names: K[]) {
  return names.map(n => obj[n]);
}

getValue({ name: "rich", age: 1 }, ["name", "age"]);

//索引访问操作符
type NameType = Info["name"];
const rich1: NameType = "rich";

interface Robj<T> {
  [key: string]: T;
}

let keys: keyof Robj<number> = 10; //数字是会转成 string的
let nkey: keyof Robj<number> = "nice";

const a1: Robj<number> = {
  age: 321
};
const a2: Robj<number>["go"] = 321;

interface Typesgo {
  a: number;
  b: string;
}

type Myt = Typesgo[keyof Typesgo];

// 映射类型  群体映射 readonly

type Agen = {
  age: number;
  nice: string;
};

interface Rule {
  age: Agen;
  name: string;
  year: number;
}

type ReadonlyType<T> = { readonly [P in keyof T]: T[P] };

type Read = ReadonlyType<Rule>;

// 为了 方便 readonly 的转换  内置了 ReadOnly Partial
type ReadOne = Readonly<Rule>; //ReadOnly 全部变成 readonly
type ReadTwo = Partial<Rule>; // Partial 全部转成 可选 ？

// Pick Record

type PickGo<T, K extends keyof T> = { [P in K]: T[P] };

type RecordGo<K extends keyof any, T> = { [P in K]: T };

type PickOne = Pick<Rule, "age">; // 筛选 对象中的 key

const pick22: Rule = {
  age: { age: 1, nice: "rich" },
  name: "rich",
  year: 321
};

let pickstr: PickOne = { age: { age: 123, nice: "nice" } };
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: any = [];
  keys.map(key => {
    res[key] = obj[key];
  });
  return res;
}

pick(pick22, ["age", "name"]);
// Record 把 对象中的 属性 转为其他值
// function mapObj<K extends string | number, T, U>(obj:Record<K,T>,f:(x: T) => U):Record<K,U>{
//     const res:any = {}
//     for (const key of Object.keys(obj)) {
//         res[key] = f(obj[key])
//     }
//     return res
// }

// 逆向推断 映射
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = { [P in keyof T]: Proxy<T[P]> };

function proxify<T>(obj: T): Proxify<T> {
  let res = {} as Proxify<T>;
  for (const key in obj) {
    res[key] = {
      get: () => obj[key],
      set: value => (obj[key] = value)
    };
  }
  return res;
}

let pro = {
  name: "rich",
  age: 6
};

let proxyPros = proxify(pro);
// 拆包
function unproxy<T>(t: Proxify<T>): T {
  let res = {} as T;
  for (const key in t) {
    res[key] = t[key].get();
  }
  return res;
}

// 也可以 复合写成下面的方式
type Pron<T> = {
  [P in keyof T]: {
    get(): T[P];
    set(value: T[P]): void;
  }
};

// 增加 删除 原始修饰符  +  -
//  去掉 readonly
type RemoveReadonly<T> = { -readonly [P in keyof T]: T[P] };

/** keyof 2.9的升级 */

const str0 = "a";
const str1 = 1;
const sm = Symbol();

type Type0 = {
  [str0]: string;
  [str1]: number;
  [sm]: Symbol;
};

type typego1 = keyof Type0;

// 元组 与 数组  的映射
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };

type Tuple = [number, string, boolean];

type promiseTupie = MapToPromise<Tuple>;

// unknown  3.0 升级的 顶级类型

// [1] 任何类型都可以赋值给 unknown类型
let val: unknown;
val = 321;

// [2] 如果没有类型断言或基于控制流的类型细化时、unknown不可以赋值给其他类型，此时他只能赋值给unknown和any类型
let val1: unknown;
// let val2:string = val1
val1 = val;

// [3]如果没有类型断言或基于控制流的类型细化时、不能再他上面进行任何操作
let val4: unknown;
// val4 += 1

/*** 条件类型  2.8 */

// T extends U ?X:Y

type Typeq<T> = T extends string ? string : number;

let index: Typeq<123>;
// 分布式条件类型

type tyepp<T> = T extends any ? T : never;
type typepp1 = tyepp<string | number>;
type Typename<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends undefined
  ? undefined
  : T extends () => void
  ? () => void
  : object;

type Typed = Typename<() => void>;
type Type4d = Typename<string[]>;

// 实际应用
type Diff<T, U> = T extends U ? never : T;
type Testgoa = Diff<string | number | boolean, undefined>;

// 条件与 映射 结合
type Typeof<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

// [keyof T]  把 属性不为never 的属性名返回

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  undatePart(newName: string): void;
}

type Test1 = Typeof<Part>;

// 条件类型的 类型推断

type Typein<T> = T extends any[] ? T[number] : T;
type Typein2 = Typein<string[]>;
type Typenum = Typein<number>;

type Typeinf<T> = T extends Array<infer U> ? U : T;
type Test6 = Typeinf<string[]>;
type Test7 = Typeinf<number>;

// Exclude<T,U>  去除
type Type10 = Exclude<"a" | "b" | "c", "a">;
// Etract<T,U>  交集
type EtractTest = Extract<"a" | "b" | "c", "c" | "e">;
// NonNullable<T> 去除 null undefined
type NonNull = NonNullable<string | number | null | undefined>;
// InstanceType<T>
class Aclass{constructor(){}}
// typeof 把值 转成 type
type Instance = InstanceType<typeof Aclass>
const newone:Instance = new Aclass()
type InstanceAny = InstanceType<any>
