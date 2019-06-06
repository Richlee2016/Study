import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import './index.less';

type IProps = {};

type IState = {
  isShow: boolean;
};

interface Index {
  props: IProps;
  state: IState;
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '组件',
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    // 监听触发
    Taro.eventCenter.trigger('jianting');
  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View>组件测试</View>
        <Button>按钮</Button>
      </View>
    );
  }
}

export default Index as ComponentType;
