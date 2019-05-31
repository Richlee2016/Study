/** arg 类型 */
function a(arg:IArguments){
    console.log(Array.from(arg));
}

/** reg 类型 */
const reg:RegExp = /r/
const n:string = 'rich'

const n1 = n.match(reg) as RegExpMatchArray
const n2 = reg.exec(n) as RegExpExecArray

/** Error */
const myError:Error = {name:'404',message:'321',stack:'321'}

/** 数组 Array 相关 */

// 只读数组
const onlyArr:ReadonlyArray<number | string> = [1,2,3]
// 类数组
const arrlike:ArrayLike<string> = 'box'

// onlyArr[0] = 1 //wrong

/** 装饰器 */
const Csd:ClassDecorator = function(target){}
// PropertyDecorator
// MethodDecorator
// ParameterDecorator

/** Promise 相关 */
const plk:Promise<string> = new Promise((resolve,reject) => {
    resolve('box')
})

/** 转化类 */

type Test = {
    one:string;
    two:number;
    three:Function;
    four:Array<string>;
}

type TestTwo = {
    one:string;
    two:number;
}

// 全部转化为 可选
type IsExist = Partial<Test>

// 去除 可选
type MustExist = Required<IsExist>

// 只读
type IsReadonly = Readonly<Test>

// 去掉只读
type ClearReadonly<T> = {
    -readonly [K in keyof T]:T[K]
} 

type NoOnly = ClearReadonly<IsReadonly>


// 选择其中之一
type OneType = Pick<Test,'one'>

// 读取之中的值
type OneTypeA = Test['one']

// key为 string 的对象
type StringObj = Record<string,any>

// 包含关系
type IsInclue = Exclude<TestTwo,Test>

// 不包含关系
type IsOut = Extract<TestTwo,Test>

// null 或者 undefined
type nullOrUndefin = NonNullable<''>

// 实例 
class Ins {}
type NewIns = InstanceType<typeof Ins>
const oneIns:NewIns = new Ins()