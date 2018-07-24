//用来通过上下文对象向下沉组件传递数据 store
import React,{Component} from "react"
import propTypes from 'prop-types'
export default class Provider extends Component{
    constructor(props){
        super(props);
    }
    // 设置 上下文传递 对象 校验 isRequired（必须写入）
    static childContextTypes = {
        store:propTypes.object.isRequired
    }
    // 设置 上下文传递对象
    getChildContext(){
        return {store:this.props.store};
    }
    
    render(){
        return this.props.children;
    }
}