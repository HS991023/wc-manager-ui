import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import { Button, Input, Row } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(Row.name, Row);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')