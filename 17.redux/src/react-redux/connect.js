import React,{Component} from 'react'
import propTypes from 'prop-types'
import redux from '@/redux'
export default function(mapStateToProps,mapDispatchToProps){
    //WrapedComponent 就是 Counter 组件
    return function(WrapedComponent){
        class ProxyComponent extends Component{
            // 获取上下文传递对象
            static contextTypes ={
                store:propTypes.object
            }
            constructor(props,context){
                super(props,context);
                this.store = context.store;
                this.state = mapStateToProps(this.store.getState());
            }
            componentDidMount(){
                this.unSubscribe = this.store.subscribe(() => {
                    this.setState(mapStateToProps(this.store.getState()));
                })
            }
            componentWillUnmount(){
                this.unSubscribe();
            }
            render(){
                let actions = {}
                if(typeof mapDispatchToProps == 'function'){
                    actions = mapDispatchToProps(this.store.dispatch);
                }else if(typeof mapDispatchToProps == 'object'){
                    actions = redux.bindActionCreators(mapDispatchToProps,this.store.dispatch);
                };
                return <WrapedComponent {...this.state} {...actions} />
            }
        }
        return ProxyComponent;
    }
}