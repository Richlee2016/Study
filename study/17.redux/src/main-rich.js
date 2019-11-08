import React from 'react'
import ReactDom from 'react-dom'
import Count from '@/r/components/Count'
import {Provider} from '@/r/react-redux'
import store from '@/r/store'


class Page extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Provider store={store}>
            <React.Fragment>
                <Count />
            </React.Fragment>
            </Provider>
        )
    }
}

ReactDom.render(<Page />,document.querySelector("#app"));
