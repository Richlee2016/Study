import React from 'react'
import ReactDom from 'react-dom'
import Count from '@/r/components/Count'
class Page extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Count />
            </div>
        )
    }
}

ReactDom.render(<Page />,document.querySelector("#app"));
