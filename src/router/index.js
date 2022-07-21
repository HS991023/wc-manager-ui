import Vue from 'vue'
import VueRouter from 'vue-router'
import { getRouters } from '@/directives/modules/permission'
import { getMenuPermissionList, ArrayContains } from '@/utils/array'

//安装路由
Vue.use(VueRouter);

//全局路由
const routes = [{
        name: '菜单',
        path: '/home',
        component: (resolve) => require(['@/components/Home'], resolve),
        meta: { requireAuth: true },
        children: [{
                name: '首页',
                path: '/show',
                component: (resolve) => require(['@/components/Show'], resolve),
                meta: { requireAuth: true, hasPermission: 'show' }
            },
            {
                name: '用户管理',
                path: '/userInfo',
                component: (resolve) => require(['@/views/user/UserInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:user:manager' }

            },
            {
                name: '在线用户',
                path: '/onlineUser',
                component: (resolve) => require(['@/views/user/OnlineUser'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:online:user' }
            },
            {
                name: '角色管理',
                path: '/roleInfo',
                component: (resolve) => require(['@/views/role/RoleInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:role:manager' }
            },
            {
                name: '部门管理',
                path: '/deptInfo',
                component: (resolve) => require(['@/views/dept/DeptInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:dept:info' }
            },
            {
                name: '菜单管理',
                path: '/meunInfo',
                component: (resolve) => require(['@/views/meun/MeunInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:res:manager' }
            },
            {
                name: '地区管理',
                path: '/regionInfo',
                component: (resolve) => require(['@/views/region/RegionInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:region:manager' }
            },
            {
                name: '公厕管理',
                path: '/toiletInfo',
                component: (resolve) => require(['@/views/toilet/ToiletInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:toilet:manager' }
            },
            {
                name: '坑位管理',
                path: '/positionInfo',
                component: (resolve) => require(['@/views/position/PositionInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:position:manager' }
            },
            {
                name: '设备管理',
                path: '/deviceInfo',
                component: (resolve) => require(['@/views/device/DeviceInfo'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:device:manager' }
            },
            {
                name: '登录日志',
                path: '/loginLog',
                component: (resolve) => require(['@/views/common/LoginLog'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:login:log' }
            },
            {
                name: '操作日志',
                path: '/operatorLog',
                component: (resolve) => require(['@/views/common/OperatorLog'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:operator:log' }
            },
            {
                name: '接口调用信息',
                path: '/interfaceCall',
                component: (resolve) => require(['@/views/common/ApiNumber'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:interface:call' }
            },
            {
                name: '字典管理',
                path: '/dictType',
                component: (resolve) => require(['@/views/dict/DictType'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:dict:type' }
            },
            {
                name: '字典管理',
                path: '/dictData',
                component: (resolve) => require(['@/views/dict/DictData'], resolve),
                meta: { requireAuth: true, hasPermission: 'system:dict:data' }
            }
        ]
    },
    {
        path: '/login',
        component: (resolve) => require(['@/components/Login'], resolve),
        meta: { requireAuth: false }
    },
    {
        name: '未授权',
        path: '/noauth',
        component: (resolve) => require(['@/components/common/NoAuth'], resolve),
        meta: { requireAuth: false, hasPermission: 'noauth' }
    },
    {
        name: '404 Not Found',
        path: '*',
        component: (resolve) => require(['@/components/common/404'], resolve),
        meta: { requireAuth: false, hasPermission: '404' }
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
    // 验证是否需要登陆
    if (to.meta.requireAuth) {
        // 查询sessionStorge中的登录状态
        if (sessionStorage.getItem('token')) {
            //实时获取当前登录用户的可路由菜单权限,防止浏览器输入框跳转
            getRouters().then(res => {
                //拿到当前路由数据
                let routers = res.data;
                //当前用户拥有的菜单权限数组
                res = getMenuPermissionList(routers);
                res.push('show');
                //判断当前用户拥有的权限是否包含即将跳转的菜单权限
                if (ArrayContains(res, to.meta.hasPermission)) {
                    next();
                } else {
                    next({ path: '/noauth' });
                }
            })
        } else {
            next({ path: '/login' });
        }
    } //不需要登录的直接放行   
    else {
        next();
    }
});

export default router