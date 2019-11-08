import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  pug: {
    enable: true,
    package: 'egg-view-pug',
  },
};

export default plugin;
