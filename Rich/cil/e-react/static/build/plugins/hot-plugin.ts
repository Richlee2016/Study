import webpack from 'webpack';

export default function plugin(isDev: boolean) {
  if (!isDev) return [];
  return [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ];
}
