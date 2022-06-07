// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//组件
import Home from '../components/Home'
import Login from '../components/Login'
import UserInfo from '../pages/user/UserInfo'
import OnlineUser from '../pages/user/OnlineUser'
import RoleInfo from '../pages/role/RoleInfo'
import DeptInfo from '../pages/dept/DeptInfo'
import MeunInfo from '../pages/meun/MeunInfo'
import RegionInfo from '../pages/region/RegionInfo'
import WcInfo from '../pages/wc/WcInfo'
import PositionInfo from '../pages/position/PositionInfo'
import DeviceInfo from '../pages/device/DeviceInfo'
import LoginLog from '../pages/common/LoginLog'
import OperatorLog from '../pages/common/OperatorLog'
import ApiNumber from '../pages/common/ApiNumber'
export default new VueRouter({
    mode: 'history',
    //配置路由规则
    routes: [{
            name: 'Home',
            path: '/home',
            component: Home,
            children: [{
                    name: 'UserInfo',
                    path: '/userInfo',
                    component: UserInfo

                }, {
                    name: 'OnlineUser',
                    path: '/onlineUser',
                    component: OnlineUser
                }, {
                    name: 'RoleInfo',
                    path: '/roleInfo',
                    component: RoleInfo
                }, {
                    name: 'DeptInfo',
                    path: '/deptInfo',
                    component: DeptInfo
                },
                {
                    name: 'MeunInfo',
                    path: '/meunInfo',
                    component: MeunInfo
                },
                {
                    name: 'RegionInfo',
                    path: '/regionInfo',
                    component: RegionInfo
                },
                {
                    name: 'WcInfo',
                    path: '/wcInfo',
                    component: WcInfo
                },
                {
                    name: 'PositionInfo',
                    path: '/positionInfo',
                    component: PositionInfo
                },
                {
                    name: 'DeviceInfo',
                    path: '/deviceInfo',
                    component: DeviceInfo
                },
                {
                    name: 'LoginLog',
                    path: '/loginLog',
                    component: LoginLog
                }, {
                    name: 'OperatorLog',
                    path: '/operatorLog',
                    component: OperatorLog
                },
                {
                    name: 'ApiNumber',
                    path: '/apiNumber',
                    component: ApiNumber
                }
            ]
        },
        {
            name: 'Login',
            path: '/',
            component: Login
        }
    ]
})