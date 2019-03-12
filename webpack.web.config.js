const path = require('path')
// Inspiration: https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    'contract-template-toolkit': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '_bundles', 'web'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ContractTemplateToolkit',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      // https://github.com/wycats/handlebars.js/issues/1174#issuecomment-229918935
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader?configFile=tsconfig.webpack.json',
    }],
  },
}
