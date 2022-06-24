import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import { Button, Input, Row, MessageBox, Container } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
// //引入路由器
import router from './router/index.js'
//引入自定义组件
import OperatorDataButton from './components/common/OperatorDataButton'
import SerachButton from './components/common/SerachButton'
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
Vue.component('OperatorDataButton', OperatorDataButton);
Vue.component('SerachButton', SerachButton);
Vue.config.productionTip = false

//挂载路由,vuex
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')