import React from 'react'
import actions from '@/store/actions/todos'
import {connect} from '@/react-redux'
class Todos extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {items} = this.props;
        let mapLi = items.map(item => {
            return <li></li>
        })
        return (
            <ul></ul>
        )
    }
}


export default connect(
    state => state.todos,
    dispatch => ({})
)(Todos);
