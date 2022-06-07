import Vue from 'vue';
import App from './App.vue';
//引入element-ui
import { Button, Input, Row, MessageBox } from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
//安装axios插件
Vue.prototype.$axios = axios;
// 安装插件
Vue.use(VueAxios, axios);
//注册样式全局组件
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);
Vue.component(MessageBox.name, MessageBox);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')