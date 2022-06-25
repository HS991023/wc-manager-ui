import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
    state: {
        // 保存登录状态
        loginState: false
    },
    mutations: {},
    actions: {
        // 登录
        doLogin(state) {
            state.loginState = true;
        },
        // 退出
        doLogOut(state) {
            state.loginState = false;
        }
    },
    getters: {

    },
    modules: {

    }
});
//3.导出使用
export default store