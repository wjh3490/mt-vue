const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('compression').use(CompressionPlugin, [
      {
        test: /\.js$|\.css$/,
        threshold: 1024 * 10,
        deleteOriginalAssets: false
      }
    ]);
  }
};
