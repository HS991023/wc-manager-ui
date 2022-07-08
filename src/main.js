import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import { Button, Input, Row, MessageBox, Container } from 'element-ui'
import router from './router/index.js'
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueAxios, axios)
Vue.use(ElementUI, { locale })
Vue.component(Row.name, Row)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Container.name, Container)
Vue.config.productionTip = false

//挂载路由,vuex等
new Vue({
    render: h => h(App),
    //vuex
    store,
    //router
    router,
    //全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
}).$mount('#app')