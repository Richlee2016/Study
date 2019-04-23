import React from 'react'
import propTypes from 'prop-types'
import {createActions} from "@/r/redux"
export default function(mapStateToProp,mapActionToProp){
    return function(WrapedComponent){
        class ProxyComponent extends React.Component{
            constructor(props,context){
                super(props);
                this.store = context.store;
                this.state = mapStateToProp(this.store.getState());
            }

            static contextTypes ={
                store:propTypes.object
            }

            componentDidMount(){
                this.unSubscribe = this.store.subscribe(() => {
                    this.setState(mapStateToProp(this.store.getState()));
                })
            }
            componentWillUnmount(){
                this.unSubscribe();
            }

            render(){
                let actions;
                let actionType = typeof mapActionToProp
                if(actionType == 'function'){
                    actions = mapActionToProp(this.store.dispatch);
                }else if(actionType == 'object'){
                    actions = createActions(mapActionToProp,this.store.dispatch);
                }
                return <WrapedComponent {...this.state} {...actions}/>;
            }
        }
        return ProxyComponent;
    }
}