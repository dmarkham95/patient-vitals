const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log("slsw.lib.entries");
console.log(slsw.lib.entries);
console.log("__dirname");
console.log(path.resolve(__dirname));
console.log("slsw.lib.webpack.isLocal");
console.log(slsw.lib.webpack.isLocal);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  //mode: 'none',
  entry: slsw.lib.entries,
  node: {
    __filename: true,
    __dirname: true,
  },
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  optimization: {minimize: false},
  performance: {hints: false},
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx','.js', '.jsx', '.json'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        // include: path.join(__dirname),
        // exclude: /node_modules/
      }
    ]
},
plugins: [
    new CopyWebpackPlugin([
        // { from: './dist', to: "./src" },
        { from: './dist/_DomainLayer/Entities/TypeOrm', to: "./src/_DomainLayer/Entities/TypeOrm" }
    ])
]
};

// ,
//       {
//         test: /\.ts$/,
//         loader: "ts-loader",
//         include: path.join(__dirname,"src/models"), 
//         exclude: /node_modules/
//       }