// 1.typeof

// is 判定值的类型
type AxiosError = "string";
function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError;
}

const isVlueRes = isAxiosError({ isAxiosError: "nice" });

const myObj = {
  name: "rich",
  age: 29
};

type MyObjType = typeof myObj;

// keyof extend

// typeof + keyof  捕获键的名称
type MyKeyOfType = keyof MyObjType;

// extends 泛型的约束  T extends object T的类型是object
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name];
}

const MyGetName = get(myObj, "age");

// in - 遍历键名
type res = (radius: number) => { [T in keyof MyObjType]: MyObjType[T] };

// 条件类型
type isBool<T> = T extends boolean ? true : false;

type ThisIsBool = isBool<false>;
type ThisIsNotBool = isBool<string>;

// 字典类型
interface Dictionary<T> {
  [index: string]: T;
}

// infer - 延迟推断类型(不懂)----------------------------------------------------------------------
type ElementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number

// 常用技巧
// 使用 const enum 维护常量列表
const enum STATUS {
  TODO = "TODO",
  DONE = "DONE",
  DOING = "DOING"
}

const STATUSB ={
  TODO : "TODO",
  DONE : "DONE",
  DOING : "DOING"
}

function todos(status: any) {}

todos(STATUS.TODO);
todos(STATUSB.TODO);
// Partial & Pick
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  age: number;
  name: string;
}

// type PartialUser = { id?: number; age?: number; name?: string }
type PartialUser = Partial<User>;

// type PickUser = { id: number; age: number }
type PickUser = Pick<User, "id" | "age">;

// Exclude & Omit
type MyExclude<T, U> = T extends U ? never : T;

// type A = 'a'  非交集
type A = Exclude<"x" | "a", "x" | "y" | "z">;
//  交集
type At = Extract<"x" | "a", "x" | "y" | "z">;
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface User {
  id: number;
  age: number;
  name: string;
}

// type PickUser = { age: number; name: string }
type OmitUser = Omit<User, "id">;

// never 类型  在条件类型中做 空 类型使用
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>; // 'updatePart'
type T41 = NonFunctionPropertyNames<Part>; // 'id' | 'name' | 'subparts'

// 混合类 ( mixins )

// 所有mixins 都需要
type Constructor<T = {}> = new (...arg: any[]) => T;

// 一个函数返回一个 基础类
function RichMixins<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class RichTestMixinSub {
  box = 1;
}

const MixinClass = RichMixins(RichTestMixinSub);

const myDateNow = new MixinClass();

console.log(myDateNow.timestamp);

// 类型转换(不懂)---------------------------------------------------------------------------
interface Action<T> {
  payload: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";
  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: "delay"
    }));
  }
  setMessage(action: Action<Date>) {
    return {
      payload: action.payload.getMilliseconds(),
      type: "set-message"
    };
  }
}

const connect: Connect = _m => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello ${input}`
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
  })
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

const connected: Connected = connect(new EffectModule());

// 解题
type FuncName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type Middle = { [T in FuncName<EffectModule>]: EffectModule[T] };

type Transfer<T> = {
  [P in keyof T]: T[P] extends (input: Promise<infer J>) => Promise<infer K>
    ? (input: J) => K
    : T[P] extends (action: Action<infer J>) => infer K
    ? (input: J) => K
    : never;
};

type Connect = (
  module: EffectModule
) => { [T in keyof Transfer<Middle>]: Transfer<Middle>[T] };

// 控制反转与依赖注入
