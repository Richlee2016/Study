# git 和 gitHub

标签（空格分隔）： Git

[toc]

---

 1. Git入门：http://t.cn/RKcRsQC
 2. Git常用命令备忘：http://t.cn/R2QSt12
 3. 25个 Git 进阶技巧：http://t.cn/R2lMUFV
 4. Git版本管理工具介绍：http://t.cn/R7VvD8O
 5. Git廖雪峰:https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
## 指令

 - git clone 克隆
 - git config --global user.name 查看 和 设置 user.name
 - git config --global user.email 查看 和 设置 user.email
 - git config --list 查看列表
 - git status 查看状态
 - git add  添加文件
    name 单个提交
    . 全部提交
 - git commit 提交
    -m “name”  单独
    -a -m  add 和 commit 一起操作
 - git log 查看操作记录
 - git diff 对比 1区 和 2区 对比
    git diff --cached(--staged) 2区 和3区对比
    git diff master 1区 和 3区对比
 - git reset HEAD <file.name> 2 撤 1
    git checkout -- <file.name> 1 撤销 0
    git commit --amend 撤销 提交

## 创建项目步骤

```js
//安装
1.cd github
2.git clone url
//设置贡献者
3.cd project
4.git config --global user.name "Richlee2016"
5.git config --global user.email "345642459@qq.com"
```
## 一般步骤
```js
git add .
git commit -m 'a'
git pull origin master
git push origin master
```
## git的三个区

- 工作区
- 暂存区
    作为过渡层
    避免误操作
    保护工作区和版本区
    分支处理
- 版本区（库）


## git 步骤
### 初始化 添加 提交
```js
//创建仓库
git init 
//提交到 暂存区
git add <file>   
// git add . 提交 所有文件到 暂存区

//提交到 master
git commit -m 'mark' 


```

### 修改状态  比较类容
```js
git status //修改状态
git diff //比较类容

//工作区 和 版本库里面最新版本的区别
git diff HEAD -- <file> 
```

### 版本回退
```js
git log
git log --pretty=oneline
git reset --hard HEAD^ //回退 HEAD^^ 表示 回退两次  HEAD~10 表示回退10次
git reset --hard [commit_id]  //到目标版本
git reflog //记录的每一次命令
```


### 撤销修改
```js
//把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
//一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
//一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
//总之，就是让这个文件回到最近一次git commit或git add时的状态。
git checkout -- <file>

//可以把暂存区的修改撤销掉（unstage），重新放回工作区
git reset HEAD <file>  
```

### 关联远程仓库
```js
git remote add origin <origin src>
git pull origin master
git push -u origin master //第一次推送
git push origin master //以后推送
git clone <origin src>
```

### 分支管理
```js
//git checkout命令加上-b参数表示创建并切换
//git branch dev //创建分支
//git checkout dev //切换分支
git checkout -b dev
git branch //查看当前分支
git merge dev //合并分支
git branch -d dev //删除分支
git log --graph //命令可以看到分支合并图。
```
