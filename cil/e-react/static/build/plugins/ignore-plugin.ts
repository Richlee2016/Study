import webpack from 'webpack';

export default function plugin() {
  return [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)];
}
