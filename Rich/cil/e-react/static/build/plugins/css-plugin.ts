import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function plugin() {
  return [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
  ];
}
