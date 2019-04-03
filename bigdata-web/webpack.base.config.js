const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            },
            {

                test: /\.less$/,

                loader: "style-loader!css-loader!less-loader",

            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue','.json'],
        alias: {
            //公共路径配置
            '@':path.resolve('src'),
            'vue': 'vue/dist/vue.esm.js',
            '@views':path.resolve('src/views'),
            '@store':path.resolve('./src/store'),
            '@components':path.resolve('./src/views/components'),
            '@images':path.resolve('./src/images'),
            //bigdata路径配置
            '@bd':path.resolve('src/views/bd'),
            '@datax':path.resolve('./src/views/cbr/wh_config/datax'),
            // '@datax':path.resolve('./src/views/bd/wh_config/datax'),
            '@SysManager':path.resolve('./src/views/bd/SysManager'),
            '@realreport':path.resolve('./src/views/bd/realreport'),
            '@utils':path.resolve('./src/views/bd/utils'),
            //dbms路径配置
            '@dbms':path.resolve('./src/views/dbms'),
            '@rdbms':path.resolve('src/views/dbms/rdbms'),
            //cbr路径配置
            '@cbr':path.resolve('./src/views/cbr'),
            //publish路径配置
            '@publish':path.resolve('./src/views/cbr/wh_config/publish'),
        }
    }
};