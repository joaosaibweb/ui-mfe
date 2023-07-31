const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const exposesUi = require("./src/exposes/ui/paths.json");
const urlsMfes = require("./url-mfes.json");

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  output: {
  publicPath: `${urlsMfes.urlUi}/`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3029,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource", 
    },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "ui",
      filename: "remoteEntry.js",
      remotes: {
       host: `host@${urlsMfes.urlHostMfe}/remoteEntry.js`
      },
      exposes: {
        ...exposesUi,
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
