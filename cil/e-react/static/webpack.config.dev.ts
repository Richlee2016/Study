import path from 'path';
import baseConfig from './build/configs/base';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const srcDir = path.resolve(__dirname, './src');
export default merge(baseConfig, {
  entry: {
    index: path.join(srcDir, './index.tsx'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcDir, './index.html'),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: 'localhost',
    port: 8066,
  },
});
