const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.rhl.js');

const options = {
  publicPath: config.output.publicPath,
  quiet: true,
  contentBase: './public',
  hot: true,
  host: 'localhost',
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(5000, '0.0.0.0', () => {
  console.log('dev server listening on port 5000');
});
