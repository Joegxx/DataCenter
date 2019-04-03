# 大数据后台管理页面
此页面作为大数据后台配置页面，基本不对外开放，供内部使用，所以并发很小，可以忽略  
前端和后台是完全分离的，所以后台的服务和前端有一个对应关系，其中前端路径的前缀配置在src/global_config.vue文件中，后台的服务配置分为开发和生产
开发环境是直接配置在webpack.dev.config.js文件中，生产环境目前使用的是nginx做代理转发

### DataX配置页面
前端路径前缀 /whtc/datax  
后台服务配置
```
//设置跨域代理
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            //匹配代理的url
            '/whtc': {
                // 目标服务器地址
                target: 'http://127.0.0.1:8081',
                //路径重写
                pathRewrite: {'^/whtc' : '/whtc'},
                changeOrigin: true
            }
        }
    }
```