import React, { Fragment } from 'react';
import './index.less';
type IProps = {};

type GroupItemType = string | boolean;

type GroupType = {
  title: string;
  group: Array<GroupItemType>[];
};

type IState = {
  headerList: Array<{
    label: string;
    pay: number;
    link: string;
  }>;
  groupList: Array<GroupType>;
};

export default class App extends React.Component<IProps, IState> {
  state: IState = {
    headerList: [
      {
        label: '创业版',
        pay: 8900,
        link: '123',
      },
      {
        label: '创业版',
        pay: 8900,
        link: '124',
      },
      {
        label: '创业版',
        pay: 8900,
        link: '125',
      },
    ],
    groupList: [
      {
        title: '创意云会员',
        group: [
          ['品牌券', '1张/月', '1张/月', '20张/月'],
          ['联合底标', false, true, true],
          ['模板券', '4张/月', '4张/月', '20张/月'],
          ['会员专享模板', true, true, true],
          ['会员专享正版素材', true, true, true],
          ['付费模板折扣', '9.5折', '9.5折', '9折'],
        ],
      },
      {
        title: '互动营销',
        group: [
          ['品牌券', '1张/月', '1张/月', '20张/月'],
          ['联合底标', false, true, true],
          ['模板券', '4张/月', '4张/月', '20张/月'],
          ['会员专享模板', true, true, true],
          ['会员专享正版素材', true, true, true],
          ['付费模板折扣', '9.5折', '9.5折', '9折'],
        ],
      },
    ],
  };
  // 返回是否
  setTrueOrFalse(item: GroupItemType) {
    if (typeof item === 'boolean') {
      return item ? '是' : '否';
    }
    return item;
  }

  render() {
    const { headerList, groupList } = this.state;
    // hader 选择区域
    const mapHeaderList = headerList.map(h => {
      return (
        <Fragment key={h.link}>
          <li>
            <div>{h.label}</div>
            <div>￥{h.pay}/年</div>
            <a href={h.link}>预约演示</a>
          </li>
        </Fragment>
      );
    });
    // 内容区域
    const mapGroupList = groupList.map((g, idx) => {
      return (
        <Fragment key={idx}>
          <h3>{g.title}</h3>
          <ul className="list-group-item">
            {g.group.map((o, j) => (
              <li key={j}>
                {o.map((item, i) => (
                  <span key={i}>{this.setTrueOrFalse(item)}</span>
                ))}
              </li>
            ))}
          </ul>
        </Fragment>
      );
    });
    return (
      <div className="vip-list">
        <ul className="list-header">
          <li>功能特权</li>
          {mapHeaderList}
        </ul>
        <div className="list-group">{mapGroupList}</div>
      </div>
    );
  }
}
