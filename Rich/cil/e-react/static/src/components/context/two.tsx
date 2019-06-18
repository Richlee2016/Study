import React from 'react';
import { Context } from './context';
// 使用 contextType 获取 context
class SonTwo extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    SonTwo.contextType = Context;
  }
  render() {
    const Context = JSON.parse(this.context);
    return (
      <div>
        <span>2 ============>用contextType 传值{Context.box}</span>
      </div>
    );
  }
}
export default SonTwo;
