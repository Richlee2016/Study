import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Navigator } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { AtButton } from 'taro-ui';
import './index.less';

type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
};

type IState = {
  isShow: boolean;
  pageList: Array<string>;
};

interface Index {
  props: PageStateProps;
  state: IState;
}

@inject('counterStore')
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  state = {
    isShow: false,
    pageList: ['pages/index/index', 'pages/zu-jian/index'],
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };

  render() {
    const { pageList } = this.state;
    const mapList = pageList.map(p => {
      const pathArr = p.split('/');
      pathArr.splice(0, 1, '..');
      const path = pathArr.join('/');
      return (
        <Navigator key={p} url={path}>
          {p}
        </Navigator>
      );
    });
    return (
      <View className="index">
        <View>{mapList}</View>
        <AtButton type="primary">321</AtButton>
      </View>
    );
  }
}

export default Index as ComponentType;
