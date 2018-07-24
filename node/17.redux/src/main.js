import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '@/components/Counter'
import Todos from '@/components/Todos'
import {Provider} from "@/react-redux"
import store from "@/store"
class Page extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <Provider store={store}>
                <React.Fragment>
                    <Counter />
                    <br />
                    <Todos />
                </React.Fragment>
            </Provider>
        )
    };
}


ReactDOM.render(<Page />,document.querySelector("#app"))

