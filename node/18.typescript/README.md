# typescipt

[toc]

---

## vscode配置自动编译
```
#1.第一步   tsc --inti 生成tsconfig.json   改 "outDir": "./js",  
#2、第二步 任务 - 运行任务  监视tsconfig.json
```

## typeScript中的数据类型
```
typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型
布尔类型（boolean）
数字类型（number）
字符串类型(string)
数组类型（array）
元组类型（tuple）
枚举类型（enum）

任意类型（any）
null 和 undefined
void类型
never类型
```

## typeScript中的函数
```
函数的定义
可选参数
默认参数
剩余参数
函数重载
箭头函数  es6
```

## typeScript中的类
```
类的定义
继承
类里面的修饰符
静态属性 静态方法
抽象类 继承 多态
```

## 类里面的修饰符
```
public :公有          在当前类里面、 子类  、类外面都可以访问
protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
private ：私有         在当前类里面可以访问，子类、类外部都没法访问

属性如果不加修饰符 默认就是 公有 （public）
```

## typeScript中的接口
```
属性类接口
函数类型接口
可索引接口
类类型接口
接口扩展
```