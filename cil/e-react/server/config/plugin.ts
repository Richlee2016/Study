import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
};

export default plugin;
