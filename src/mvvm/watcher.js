import {isFn} from "./utils"
class Watcher {
    constructor(vm,fn){
        this.vm = vm;
        this.eve = vm.$eve;
        if(isFn(isFn)){
            this.getter = fn;
        }
        this.notify();
    }

    // 进行监听
    notify(){
        this.eve.group.forEach(o => {
            this.eve.listen("notify",this.setter);
        })
    }

    // 获取新值
    getval(){

    }

    // 对比进行设置
    setter(){
        console.log("已经成功进行监听");
    }
}
export default Watcher;