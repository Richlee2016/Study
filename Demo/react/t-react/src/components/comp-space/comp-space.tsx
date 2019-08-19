import React from 'react';
export default class CssSpecial extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="css-angle">
          <h4>三角形</h4>
          <div className="angle-box">
            <button className="angle-btn">触发</button>
            <div className="angle-outer">
              <div className="angle-inner" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
