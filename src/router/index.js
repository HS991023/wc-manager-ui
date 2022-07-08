// 该文件专门用于创建整个应用的路由器
import Vue from 'vue';
import VueRouter from 'vue-router'

//安装路由
Vue.use(VueRouter);

//全局路由
const routes = [{
        path: '/home',
        component: (resolve) => require(['@/components/Home'], resolve),
        meta: { requireAuth: true },
        children: [{
                path: '/show',
                component: (resolve) => require(['@/components/Show'], resolve),
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/userInfo',
                component: (resolve) => require(['@/views/user/UserInfo'], resolve),
                meta: { requireAuth: true },

            }, {
                path: '/onlineUser',
                component: (resolve) => require(['@/views/user/OnlineUser'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/roleInfo',
                component: (resolve) => require(['@/views/role/RoleInfo'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/deptInfo',
                component: (resolve) => require(['@/views/dept/DeptInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/meunInfo',
                component: (resolve) => require(['@/views/meun/MeunInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/regionInfo',
                component: (resolve) => require(['@/views/region/RegionInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/toiletInfo',
                component: (resolve) => require(['@/views/toilet/ToiletInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/positionInfo',
                component: (resolve) => require(['@/views/position/PositionInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/deviceInfo',
                component: (resolve) => require(['@/views/device/DeviceInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/loginLog',
                component: (resolve) => require(['@/views/common/LoginLog'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/operatorLog',
                component: (resolve) => require(['@/views/common/OperatorLog'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/interfaceCall',
                component: (resolve) => require(['@/views/common/ApiNumber'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/dictType',
                component: (resolve) => require(['@/views/dict/DictType'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/dictData',
                component: (resolve) => require(['@/views/dict/DictData'], resolve),
                meta: { requireAuth: true },
            }
        ]
    },
    {
        path: '/login',
        component: (resolve) => require(['@/components/Login'], resolve),
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

// 设置路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 验证是否需要登陆
        if (sessionStorage.getItem('token')) { // 查询sessionStorge中的登录状态
            next();
        } else {
            next({
                path: '/login',
            });
        }
    } else {
        next();
    }
});

export default router