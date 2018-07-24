import React from 'react'
import store from '@/r/store'
import * as types from '@/r/store/action-types'
export default class Count extends React.Component{
    constructor(props){
        super(props);
        this.state = {num:store.getState().count.num}
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState({num:store.getState().count.num});
        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        return (
            <div>
                <button onClick={() => {store.dispatch({type:types.ADD})}}>+</button>
                <span>{this.state.num}</span>
                <button>-</button>
            </div>
        )
    }
}