import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import directive from './directives'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import router from './router/index.js'

//安装
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(directive)
Vue.use(VueAxios, axios)
Vue.use(ElementUI, { locale })
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