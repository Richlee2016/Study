import React from 'react'
import * as types from '@/r/store/action-types'
import {connect} from '@/r/react-redux'
import actions from '@/r/store/actions/count'
class Count extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (
            <div>
                <button onClick={this.props.add}>+</button>
                <span>{this.props.num}</span>
                <button onClick={this.props.minus}>-</button>
            </div>
        )
    }
}

export default connect(
    state => state.count,
    actions
)(Count)