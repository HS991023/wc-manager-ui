const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    //关闭语法检查
    lintOnSave: false,
    //配置浏览器控制台不可看到源代码
    productionSourceMap: false,
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8099',
                pathRewrite: { '^/api': '' },
                // ws: true,
                // changeOrigin: true
            }
        },
        // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        historyApiFallback: {
            index: '/index.html' //与output的publicPath
        }
    }
})