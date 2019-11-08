import React from 'react'
import { inject, observer } from 'mobx-react'
import RouterCom from '@/router'
import './App.less'

@inject('rootStore')
@observer

class Index extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='container'>
        <RouterCom />
      </div>
    )
  }
}

export default Index
