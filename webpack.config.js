const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = function(env, options) {
  var value = JSON.parse(process.env.npm_config_argv);
  var code;
  if (value.cooked.length > 2) {
    code = value.cooked[3];
  } else {
    code = "dev";
  }

  return {
    performance: {
      maxEntrypointSize: 5120000,
      maxAssetSize: 5120000
    },
    stats: "errors-only",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: "url-loader?limit=100000"
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name]-[hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.ya?ml$/,
          type: "json",
          exclude: /node_modules/,
          use: [
            {
              loader: "yaml-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "src", "index.html")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CopyPlugin([
        {
          from: "locales/**/*",
          to: ""
        }
      ])
    ],
    externals: {
      'Config': JSON.stringify( code == 'production' ? require('./src/config/config.json') : require('./src/config/config.'  + code + '.json'))
    }
  }
};
