const path = require('path')
// Inspiration: https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

module.exports = {
  mode: 'production',
  entry: {
    'contract-template-toolkit': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '_bundles', 'jscore'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'ContractTemplateToolkit',
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
      test: /\.ts?$/,
      loader: 'ts-loader?configFile=tsconfig.webpack.json',
    }],
  },
}
