const path = require("path");

module.exports = {
  devServer: {
    host: "localhost",
  },
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ["./node_modules", "./src/assets"],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@themeConfig": path.resolve(__dirname, "themeConfig.js"),
        "@core": path.resolve(__dirname, "src/@core"),
        // "@validations": path.resolve(
        //   __dirname,
        //   "src/@core/utils/validations/validations.js"
        // ),
        "@axios": path.resolve(__dirname, "src/libs/axios"),
      },
    },
  },
};
