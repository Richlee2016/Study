import React from 'react';

type IProps = {};

type IState = {};

class Box extends React.Component {
  render() {
    return <div>321321</div>;
  }
}

type BoxType = InstanceType<typeof Box>;

export default class Refs extends React.Component<IProps, IState> {
  public myRef: React.RefObject<any> = React.createRef();
  componentDidMount() {
    console.log(this.myRef);
  }

  handleDiv(el: HTMLElement) {
    console.log(el);
    el.innerHTML = '这是 refs';
  }
  handleOther(el: BoxType) {
    console.log(el);
  }
  render() {
    return (
      <div>
        <div ref={this.myRef}>这是一个ref</div>
        <div ref={el => this.handleDiv(el as HTMLElement)} />
        <Box ref={el => this.handleOther(el as BoxType)} />
      </div>
    );
  }
}
