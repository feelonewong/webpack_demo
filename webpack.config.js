// webpack config
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: resolve(__dirname, "build"),
  },
  //loader config
  module: {
    rules: [
      {
        //匹配的文件，执行顺序 从右往左依次执行，不同文件配置不同loader
        test: /\.css$/,
        //   js样式资源插入进行到header中/css文件变成common模块加载到js中，内容是样式字符串
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // need url-loader file-loader
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        type: "javascript/auto",
        options: {
          esModule: false,
          limit: 8 * 1024,
        },
      },
    ],
  },
  // download import use: npm i html-webpack-plugin -D  about html
  plugins: [
    new HtmlWebpackPlugin({
      // copy this file
      template: "./src/index.html",
    }),
  ],
  // webpack-dev-server
  devServer: {
    static: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
};
