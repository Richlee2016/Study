/*
 * @Date: 2019-05-27 14:36:06
 * @LastEditors: RichLee
 * @LastEditTime: 2019-06-04 15:39:30
 */

import webpack from 'webpack';
import getLoaders from '../loaders';
import getPlugin from '../plugins';
const isDev = process.env.NODE_ENV === 'development';

const baseConfig: webpack.Configuration = {
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: getLoaders(isDev),
  },
  plugins: getPlugin(isDev),
};

export default baseConfig;
