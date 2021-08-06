const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.DefinePlugin({
        'process.versions.node': JSON.stringify(
          process.versions.node || '0.0.0'
        )
      }),
      new NodePolyfillPlugin({})
    ],
    resolve: {
      fallback: {
        fs: false
      }
    }
  });
};
