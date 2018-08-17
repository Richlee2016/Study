import React from 'react'
import ReactDom from 'react-dom'
import {connect} from '../react-redux'
import actions from '../store/actions/count'
class Count extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return (<div>
            <button onClick={this.props.minus}>-</button>
            <span>{this.props.num}</span>
            <button onClick={this.props.add}>+</button>
            </div>)
    }
}

export default connect(
    state => state.count,
    actions
)(Count);

