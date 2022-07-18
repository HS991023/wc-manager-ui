import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import getters from './getters'

//1.安装插件
Vue.use(Vuex);

//2.创建对象
const store = new Vuex.Store({
    modules: {
        permission
    },
    getters
});

//3.导出使用
export default store