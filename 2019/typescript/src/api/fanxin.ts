// 泛型的约束
interface ValueWithLength {
    length:number
}
const getArray = <T extends ValueWithLength>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
};

getArray([1,2],3)

getArray('boxa',2)

//什么时候考虑用泛型 
// 参数为any
// 返回值也为 any的时候

// keyof  索引类型  返回所有属性名构成的数组
const getProps= <T,K extends keyof T>(obj:T,pro:K) => {
    return obj[pro]
}
getProps({a:1,b:2},'a')
