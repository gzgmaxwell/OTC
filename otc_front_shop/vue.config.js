const resolve = dir => require("path").join(__dirname, dir);

module.exports = {
  publicPath: "/shop",
  productionSourceMap: false,
  lintOnSave: false,

  devServer: {
    port: 3000,
    open: true
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variable.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@a", resolve("src/api"))
      .set("@c", resolve("src/components"))
      .set("@f", resolve("src/filters"))
      .set("@p", resolve("src/public"))
      .set("@s", resolve("src/store"))
      .set("@v", resolve("src/views"))
      .set("@r", resolve("src/router"));
  },

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '后台管理',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }
};
