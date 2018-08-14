# mySQL


---

## 查询
```
# 查询 与条件
SELECT * FROM user
WHERE age>30 AND age<80
WHERE age BETWEEN 30 AND 80

-年龄30或者50
WHERE age in (30,80)
WHERE age NOT IN (30,80)

-判断为null
WHERE age IS NULL
WHERE age IS NOT NULL

# 加 CONCAT 内置函数 可以实现 字符串的连接
a:rich
b:lee
SELECT CONCAT(a,b) FROM user;

# AND OR NOT


# 模糊查询
SELECT * FROM user
WHERE age like '1%' 

# COUNT
SELECT COUNT(*) FROM user  //只返回不包含null的
SELECT COUNT(1) FROM user //返回所有的
```