import path from 'path';
import baseConfig from './build/configs/base';
import merge from 'webpack-merge';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
const srcDir = path.resolve(__dirname, './src');
export default merge(baseConfig, {
  entry: {
    ssr: path.join(srcDir, './container/ssr/server'),
  },
});
