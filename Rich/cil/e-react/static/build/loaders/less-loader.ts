import MiniCssExtractPlugin from 'mini-css-extract-plugin';
export default function loader(isDev: boolean) {
  return {
    test: /\.less$/,
    use: [
      isDev
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          }
        : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
        },
      },
      'postcss-loader',
      'less-loader',
    ],
  };
}
