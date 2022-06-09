const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭语法检查
    lintOnSave: false,
    //配置浏览器控制台不可看到源代码
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.github.com/search/users?q=test',
                pathRewrite: { '^/api': '' },
                // ws: true,
                // changeOrigin: true
            }
        }
    }
})