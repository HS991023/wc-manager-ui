import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import { Button, Input, Row, MessageBox, Container } from 'element-ui';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//安装axios插件
Vue.prototype.$axios = axios;
Vue.prototype.$alert = MessageBox.alert;
// 安装插件
Vue.use(VueAxios, axios);
//应用插件
Vue.use(VueRouter);
//注册样式全局组件
Vue.component(MessageBox.name, MessageBox);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Container.name, Container);
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')