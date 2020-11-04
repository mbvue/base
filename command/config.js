const root = process.cwd();
const path = require('path');
const merge = require('lodash.merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require('./utils');
const VueLoader = utils.vueLoader();

module.exports = function (mode, customize) {
    let config = {
        mode: mode, //当前模式
        entry: './src/index.js', //入口文件
    
        //解析模块请求的选项
        resolve: {
            modules: ['node_modules', path.resolve(root, './src')], //用于查找模块的目录
            extensions: ['.css', '.less', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.md', '.json'], //使用的扩展名
            //模块别名列表
            alias: {
                '@': path.resolve(root, 'src')
            }
        },

        //输出配置
        output: {
            publicPath: '/',
            path: path.resolve(root, './dist'), //输出路径
            filename: 'js/[name].[hash:8].js' //文件名称
        },
    
        //模块配置
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader' }, //加载 vue
                { test: /\.md$/, use: [{ loader: 'vue-loader' }, { loader: '@mbvue/markdown-loader' }] }, //加载 md
                { test: /\.(js|jsx|ts|tsx)$/, loader: 'babel-loader', exclude: /node_modules/ }, //加载 js jsx ts tsx
                { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/, loader: 'url-loader', options: { limit: 10000 } }, //加载静态资源
                { test: /\.css$/, use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'] }, //加载 css
                { test: /\.less$/, use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }, 'postcss-loader'] } //加载 less
            ]
        },
    
        //插件
        plugins: [
            new VueLoader()
        ],
    
        //服务配置
        devServer: {
            historyApiFallback: {
                rewrites: [{ from: /./, to: '/index.html' }] //重写URL
            },
            publicPath: '/', //访问目录
            compress: true, //启用gzip压缩
            hot: true, //热替换
            open: true, //在浏览器中打开
            stats: {
                assets: false, //资源信息
                cached: false, //缓存模块信息
                cachedAssets: false, //缓存的资源信息
                children: false, //children 信息
                chunks: false, //chunk 信息
                chunkModules: false, //构建模块信息
                chunkOrigins: false, //chunk 和 chunk merge 来源的信息
                depth: false, //每个模块到入口起点的距离
                entrypoints: false, //bundle 显示入口起点
                env: false, //env 信息
                errors: true, //错误信息
                errorDetails: true, //错误的详细信息
                hash: false, //compilation 的哈希值
                modules: false, //构建模块信息
                moduleTrace: true, //警告/错误的依赖和来源
                providedExports: false, //模块的导出
                publicPath: false, //public path 的信息
                reasons: false, //模块被引入的原因
                source: false, //模块的源码信息
                version: false, //webpack 版本信息
                warnings: true //警告信息
            }
        },
    
        //扩展配置html信息
        html: {
            filename: 'index.html', //文件名称
            template: path.resolve(__dirname, '../index.html'), //文件路径
            title: 'App', //标题
            keywords: '', //关键词
            description: '' //描述
        }
    };

    //Vue配置
    let vue = utils.hasModule('vue');
    if(vue) {
        config.resolve.alias['vue$'] = vue.version.slice(0, 1) === '2' ? 'vue/dist/vue.esm.js' : '@vue/runtime-dom';
    }

    let mergeConfig = merge(config, customize);

    //处理HTML
    if(!mergeConfig.plugins.find(obj => obj instanceof HtmlWebpackPlugin)) {
        mergeConfig.plugins.push(new HtmlWebpackPlugin({
            filename: mergeConfig.html.filename,
            template: mergeConfig.html.template,
            title: mergeConfig.html.title,
            keywords: mergeConfig.html.keywords,
            description: mergeConfig.html.description
        }));
    }
    delete mergeConfig.html;

    //打包处理
    if(mode === 'production') {
        mergeConfig.plugins.push.apply(mergeConfig.plugins, [
            new MiniCssExtractPlugin({ filename: 'css/[name].[chunkhash:8].css' }),
            new OptimizeCssAssetsWebpackPlugin(),
            new CleanWebpackPlugin()
        ]);
    }

    return mergeConfig;
};