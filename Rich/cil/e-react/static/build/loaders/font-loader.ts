export default function loader(isDev: boolean) {
  return {
    test: /\.(woff|eot|ttf)\??.*$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: `[name]${isDev ? '' : '.[hash:10]'}.[ext]`,
          limit: 10 * 1024,
        },
      },
    ],
  };
}
