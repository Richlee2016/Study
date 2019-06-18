import React from 'react';
import ReactDOM from 'react-dom/server';
import Test from '../../components/fragments';

exports.render = function() {
  return ReactDOM.renderToString(<Test />);
};
