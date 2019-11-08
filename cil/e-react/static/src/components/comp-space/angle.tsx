import React, { useState } from 'react';

type IProps = {};

const onOffHook = () => {
  const [onOff, setOnOff] = useState(false);
  return {
    onOff,
    on: () => setOnOff(true),
    off: () => setOnOff(false),
  };
};

export const Angle: React.SFC<IProps> = props => {
  const { onOff, on } = onOffHook();
  return (
    <div className="pop-show">
      <div className="pop-content" onClick={on}>
        触发
      </div>
      {onOff ? (
        <div className="pop-outer">
          <div className="pop-inner">{props.children}</div>
        </div>
      ) : null}
    </div>
  );
};
