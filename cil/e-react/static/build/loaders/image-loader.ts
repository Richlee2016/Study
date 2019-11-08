export default function loader() {
  return {
    test: /\.(jpg|png|gif|svg)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          limit: 10 * 1024,
        },
      },
    ],
  };
}
