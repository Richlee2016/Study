module.exports = (appInfo: any) => {
  const config: any = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1539671912752_2826";

  // add your config here
  config.middleware = ["errorHandler"];

  config.view = {
    defaultViewEngine: "nunjucks",
    defaultExtension: ".nj"
  };

  config.mongoose = {
    url: "mongodb://120.79.228.82:27017/wechat",
    options: {}
  };

  return config;
};
