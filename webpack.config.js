module.exports = {
  // 入口
  entry: './src/index.js',
  output: {
    // 虚拟路径
    publicPath: 'xuni',
    // 输出文件名
    filename: 'bundle.js'
  },

  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: 'www',
    // static: './www',
    hot: true
  },

  devtool: "cheap-source-map"
}