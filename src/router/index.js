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
                component: (resolve) => require(['@/pages/user/UserInfo'], resolve),
                meta: { requireAuth: true },

            }, {
                path: '/onlineUser',
                component: (resolve) => require(['@/pages/user/OnlineUser'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/roleInfo',
                component: (resolve) => require(['@/pages/role/RoleInfo'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/deptInfo',
                component: (resolve) => require(['@/pages/dept/DeptInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/meunInfo',
                component: (resolve) => require(['@/pages/meun/MeunInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/regionInfo',
                component: (resolve) => require(['@/pages/region/RegionInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/toiletInfo',
                component: (resolve) => require(['@/pages/toilet/ToiletInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/positionInfo',
                component: (resolve) => require(['@/pages/position/PositionInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/deviceInfo',
                component: (resolve) => require(['@/pages/device/DeviceInfo'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/dictInfo',
                component: (resolve) => require(['@/pages/dict/DictInfo'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/loginLog',
                component: (resolve) => require(['@/pages/common/LoginLog'], resolve),
                meta: { requireAuth: true },
            }, {
                path: '/operatorLog',
                component: (resolve) => require(['@/pages/common/OperatorLog'], resolve),
                meta: { requireAuth: true },
            },
            {
                path: '/apiNumber',
                component: (resolve) => require(['@/pages/common/ApiNumber'], resolve),
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