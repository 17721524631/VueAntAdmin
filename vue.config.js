// vue.config.js
const webpack = require("webpack");
const CompressionWebpackPlugin = require('compression-webpack-plugin');//引入gzip压缩插件
const prod = process.env.NODE_ENV === 'production';
module.exports = {
    publicPath: prod ? './' : '/', // 构建好的文件输出到哪里
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    css: {
        // css预设器配置项
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#6E77EA',
                },
                javascriptEnabled: true
            }
        },
    },

    // 压缩图片
    chainWebpack: config => {
        if (prod) {
            config.module
                .rule('images')
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                    bypassOnDebug: true
                })
                .end()
        }
    },

    configureWebpack: (config) => {
        if (prod) {
            return {
                //警告 webpack 的性能提示
                performance: {
                    hints: 'warning',
                    //入口起点的最大体积
                    maxEntrypointSize: 50000000,
                    //生成文件的最大体积
                    maxAssetSize: 30000000,
                    //只给出 js 文件的性能提示
                    assetFilter: function (assetFilename) {
                        return assetFilename.endsWith('.js');
                    }
                },

                // 开启GZip压缩
                plugins: [
                    new CompressionWebpackPlugin({
                        filename: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.js$|\.html$|\.json$|\.css/,
                        threshold: 0, // 只有大小大于该值的资源会被处理
                        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                        deleteOriginalAssets: true // 删除原文件
                    }),
                    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|zh-hk|en/),
                ],
                // 这里抽取了项目中公共的css、js部分，还有其他的，可以自行匹配test（正则）
                optimization: {
                    splitChunks: {
                        cacheGroups: {
                            vendor: {
                                chunks: "all",
                                test: /node_modules/,
                                name: "vendor",
                                minChunks: 1,
                                maxInitialRequests: 5,
                                minSize: 0,
                                priority: 100,
                            },
                            common: {
                                chunks: "all",
                                test: /[\\/]src[\\/]js[\\/]/,
                                name: "common",
                                minChunks: 2,
                                maxInitialRequests: 5,
                                minSize: 0,
                                priority: 60
                            },
                            styles: {
                                name: 'styles',
                                test: /\.(sa|sc|c)ss$/,
                                chunks: 'all',
                                enforce: true,
                            },
                            runtimeChunk: {
                                name: 'manifest'
                            }
                        }
                    }
                }
            }
        }
    },
    devServer: {
        open: true, //自动启动浏览器
        host: '0.0.0.0',
        port: 8080, //设置端口号
        // proxy: { // 配置跨域
        //     '/api': {
        //         target: 'http://127.0.0.1:8080/renewal',  //打包后接口地址
        //         ws: true,
        //         changOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // },
    }
}