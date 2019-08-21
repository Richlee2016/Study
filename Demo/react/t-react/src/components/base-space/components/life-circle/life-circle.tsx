import React from 'react';

type IProps = {};

type IState = {
  name: string;
  show: boolean;
};

type CircleType = {
  name?: string;
};
type CircleState = {
  showName: string;
};

class Circle extends React.Component<CircleType, CircleState> {
  state: CircleState = {
    showName: '',
  };
  constructor(props: CircleType) {
    super(props);
    // 初始化
    console.log(111, 'constrctor');
  }
  //   接收 props
  componentWillReceiveProps(nextProps: CircleType) {
    //   第一次不会触发  第二次mount才会触发（父组件控制子组件）
    console.log('接受nextprops', nextProps);
    this.setState({
      showName: nextProps.name === 'rich1' ? 'rich1' : '',
    });
  }
  //   即将挂载组件
  componentWillMount() {
    console.log(222, 'componentWillMount');
  }
  //   挂载组件
  componentDidMount() {
    console.log(444, 'componentWillMount');
  }
  //   卸载组件
  componentWillUnmount() {
    console.log('即将卸载组件');
  }
  //   即将更新组件（如果 需要重新渲染 返回true 才会更新到下面的666 777）
  shouldComponentUpdate(nextProps: CircleType, nextState: any) {
    console.log(555, 'shouldComponentUpdate');
    console.log(555, nextProps, nextState);
    return true;
  }
  //   更新组件
  componentWillUpdate() {
    console.log(666, 'componentWillUpdate');
  }
  componentDidUpdate() {
    console.log(777, 'componentDidUpdate');
  }
  render() {
    console.log(333, 'render');
    const { showName } = this.state;
    return (
      <div>
        <p>如果是rich1:就出现名字</p>
        {showName ? <p>{showName}</p> : null}
      </div>
    );
  }
}

export default class LifeCircle extends React.Component<IProps, IState> {
  state: IState = {
    name: 'rich',
    show: true,
  };
  changeName() {
    this.setState({
      name: this.state.name + 1,
    });
  }
  handleClose() {
    this.setState({
      show: !this.state.show,
    });
  }
  render() {
    const { name, show } = this.state;
    return (
      <div>
        <button onClick={this.changeName.bind(this)}>change name</button>
        <button onClick={this.handleClose.bind(this)}>close name</button>
        {show ? <Circle name={name} /> : null}
      </div>
    );
  }
}
