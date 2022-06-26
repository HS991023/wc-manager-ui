import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en' //注释英文
import locale from 'element-ui/lib/locale/lang/zh-CN'
import { Button, Input, Row, MessageBox, Container } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
// //引入路由器
import router from './router/index.js'
//引入自定义组件

// //安装axios插件
Vue.prototype.$axios = axios;
// 安装插件
Vue.use(VueAxios, axios);
// //应用插件
Vue.use(VueRouter);
//注册样式全局组件
Vue.use(ElementUI, { locale });
//Vuex
import store from './store'
Vue.prototype.$alert = MessageBox.alert;
Vue.component(MessageBox.name, MessageBox);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Container.name, Container);
//引入自定义组件

Vue.config.productionTip = false

// 设置路由生命周期函数, 用来判断该路由是否需要登录状态才可访问
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 验证是否需要登陆
        if (sessionStorage.getItem('token')) { // 查询vuex中的登录状态
            next();
        } else {
            next({
                path: '/login',
                query: {}
            });
        }
    } else {
        next();
    }
});


//挂载路由,vuex
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')