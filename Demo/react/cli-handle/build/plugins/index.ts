export default function getPlugins(isDev: boolean) {
  const plugins = [
    require('./css-plugin').default,
    require('./hot-plugin').default,
    require('./ignore-plugin').default,
  ];
  return plugins.reduce((pluginList, plugin) => {
    pluginList = [...pluginList, ...plugin.call(plugin, isDev)];
    return pluginList;
  }, []);
}
