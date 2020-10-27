const path = require('path');
const root = process.cwd();
const merge = require('lodash.merge');
const browsers = require('@mbvue/babel-preset-config/browsers');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (mode, customize) {
    let config = {
        mode: mode, //当前模式
        entry: './src/index.js', //入口文件
    
        //解析模块请求的选项
        resolve: {
            modules: ['node_modules', path.resolve(root, './src')], //用于查找模块的目录
            extensions: ['.css', '.less', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.md'], //使用的扩展名
            //模块别名列表
            alias: {
                vue: '@vue/runtime-dom',
                '@': path.resolve(root, 'src')
            }
        },

        //输出配置
        output: {
            publicPath: '/',
            path: path.resolve(root, './dist'), //输出路径
            filename: '[name].js' //文件名称
        },
    
        target: [`browserslist:${browsers}`], //构建目标
    
        //模块配置
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader' }, //加载 vue
                { test: /\.md$/, use: [{ loader: 'vue-loader' }, { loader: '@mbvue/markdown-loader' }] }, //加载 md
                { test: /\.(js|jsx|ts|tsx)$/, loader: 'babel-loader', exclude: /node_modules/ }, //加载 js jsx ts tsx
                { test: /\.css$/, use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'] }, //加载 css
                { test: /\.less$/, use: [mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader', 'postcss-loader'] } //加载 less
            ]
        },
    
        //插件
        plugins: [
            new VueLoaderPlugin()
        ],
    
        //控制只显示错误的 bundle 信息
        stats: {
            preset: 'errors-only'
        },
    
        //服务配置
        devServer: {
            historyApiFallback: {
                rewrites: [{ from: /./, to: '/index.html' }] //重写URL
            },
            contentBase: path.resolve(root, './public'), //静态文件位置
            publicPath: '/',
            compress: true, //启用gzip压缩
            hot: true,
            open: true,
            stats: 'errors-only'
        },
    
        //扩展配置html信息
        html: {
            filename: 'index.html', //文件名称
            template: path.resolve(__dirname, '../index.html'), //文件路径
            title: 'MBVue App', //标题
            keywords: '', //关键词
            description: '' //描述
        }
    };

    let mergeConfig = merge(config, customize);

    //处理HTML
    if(!mergeConfig.plugins.find(obj => obj instanceof HtmlWebpackPlugin)){
        mergeConfig.plugins.push(new HtmlWebpackPlugin({ filename: mergeConfig.html.filename, title: mergeConfig.html.title, template: mergeConfig.html.template }));
    }
    delete mergeConfig.html;

    //处理打包
    if(mode === 'production') {
        mergeConfig.plugins.push.apply(mergeConfig.plugins, [
            new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
            new OptimizeCssAssetsWebpackPlugin(),
            new CleanWebpackPlugin()
        ]);
    }

    return mergeConfig;
};