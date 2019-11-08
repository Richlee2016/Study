import path from 'path';
const tscConfig = require(path.resolve(__dirname, '../../', 'tsconfig.json'));

export default function loader() {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cwd: path.resolve(__dirname, '../../'),
          cacheDirectory: true,
        },
      },
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            ...tscConfig.compilerOptions,
            module: 'es2015',
          },
        },
      },
    ],
  };
}
