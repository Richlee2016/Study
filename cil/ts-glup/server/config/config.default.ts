import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560321325765_1303';

  // add your egg config in here
  config.middleware = [];
  // view
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    defaultViewEngine: 'pug',
    mapping: {
      '.pug': 'pug',
    },
  };
  // static
  config.static = {
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public'),
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
