
module.exports = {
  entry: "./src/index.js",

  output: {
    publicPath: "xuni",

    filename: 'bundle.js'
  },

  devServer: {
    port: 5000,
    contentBase: "www"
  },
  devtool: "cheap-source-map",
  mode: "development"
};