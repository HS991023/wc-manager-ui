// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//组件
import Home from '../pages/Home'
import Login from '../components/Login'
export default new VueRouter({
    mode: 'history',
    //配置路由规则
    routes: [{
            name: 'Home',
            path: '/home',
            component: Home
        },
        {
            name: 'Login',
            path: '/',
            component: Login
        }
    ]
})