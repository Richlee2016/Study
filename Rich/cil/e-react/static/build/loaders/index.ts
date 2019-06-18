export default function getModuleParsingRules(isDev: boolean) {
  const loaders = [
    require('./babel-loader').default,
    require('./css-loader').default,
    require('./font-loader').default,
    require('./image-loader').default,
    require('./less-loader').default,
    require('./ts-loader').default,
  ];
  return loaders.map(loader => loader.call(loader, isDev));
}
