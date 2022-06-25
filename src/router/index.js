// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//组件
import Home from '../components/Home'
import Show from '../components/Show'
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
import DictInfo from '../pages/dict/DictInfo'
import LoginLog from '../pages/common/LoginLog'
import OperatorLog from '../pages/common/OperatorLog'
import ApiNumber from '../pages/common/ApiNumber'

const routes = [{
        name: 'Home',
        path: '/home',
        component: Home,
        meta: {
            requireAuth: true
        },
        children: [{
                name: 'Show',
                path: '/show',
                component: Show,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'UserInfo',
                path: '/userInfo',
                component: UserInfo,
                meta: {
                    requireAuth: true
                },

            }, {
                name: 'OnlineUser',
                path: '/onlineUser',
                component: OnlineUser,
                meta: {
                    requireAuth: true
                },
            }, {
                name: 'RoleInfo',
                path: '/roleInfo',
                component: RoleInfo,
                meta: {
                    requireAuth: true
                },
            }, {
                name: 'DeptInfo',
                path: '/deptInfo',
                component: DeptInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'MeunInfo',
                path: '/meunInfo',
                component: MeunInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'RegionInfo',
                path: '/regionInfo',
                component: RegionInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'WcInfo',
                path: '/wcInfo',
                component: WcInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'PositionInfo',
                path: '/positionInfo',
                component: PositionInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'DeviceInfo',
                path: '/deviceInfo',
                component: DeviceInfo,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'DictInfo',
                path: '/dictInfo',
                component: DictInfo,
                meta: {
                    requireAuth: true
                },
            }, {
                name: 'LoginLog',
                path: '/loginLog',
                component: LoginLog,
                meta: {
                    requireAuth: true
                },
            }, {
                name: 'OperatorLog',
                path: '/operatorLog',
                component: OperatorLog,
                meta: {
                    requireAuth: true
                },
            },
            {
                name: 'ApiNumber',
                path: '/apiNumber',
                component: ApiNumber,
                meta: {
                    requireAuth: true
                },
            }
        ]
    },
    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            requireAuth: false
        },
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    //配置路由规则
    routes
});
export default router