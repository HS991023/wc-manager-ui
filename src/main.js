import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAMap from 'vue-amap'
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
Vue.use(VueAMap)
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


//初始化地图服务
VueAMap.initAMapApiLoader({
    key: '4190ac69b9d615c32b14d4daf110fba4',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
    v: '1.4.4',
    uiVersion: '1.0'
})
window._AMapSecurityConfig = {
    securityJsCode: '26b41ac5a82ef89e0b71001b9d60c183',
}