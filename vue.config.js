const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss:{
        additionalData:`
          @import "@/assets/scss/mixin.scss";
          @import "@/assets/scss/variable.scss";
        `
      }
    }
  },
  // 关闭es6语法校验
  lintOnSave: false
})
