import React from 'react';
import Immutable from 'immutable'
type IProps = {};

type IState = {};


const data = {
  box:'nice',
  person:{
    age:29,
    name:'richlee'
  }
}

class Rdata extends Immutable.Record(data){

}


export default class App extends React.Component<IProps, IState> {
  state = new Rdata()

  componentDidMount(){

  }
  render() {
    console.log(this.state);
    // const name = this.state.getIn(['person','name']);
  return <div>111</div>;
  }
}
