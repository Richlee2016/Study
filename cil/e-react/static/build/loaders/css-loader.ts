import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default function loader(isDev: boolean) {
  return {
    test: /\.css$/,
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
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
  };
}
