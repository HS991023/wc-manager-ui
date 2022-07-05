import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import { Button, Input, Row, MessageBox, Container } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
//引入路由器
import router from './router/index.js'
// 安装axios
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
//  引入Echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI, { locale });
//Vuex
import store from './store'
Vue.prototype.$alert = MessageBox.alert;
Vue.component(MessageBox.name, MessageBox);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(Container.name, Container);
Vue.config.productionTip = false

//挂载路由,vuex
new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')