const path = require('path');

module.exports = {
    //判断是否包含模块
    hasModule: function (name) {
        try {
            return require(path.resolve(process.cwd(), './node_modules/' + name));
        } catch (error) {
            return false;
        }
    },
    
    //加载Vue解析器
    vueLoader: function () {
        try {
            return require(path.resolve(process.cwd(), './node_modules/vue-loader')).VueLoaderPlugin;
        } catch (error) {
            return false;
        }
    }
};