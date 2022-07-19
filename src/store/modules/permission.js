const permission = {
    state: {
        //用户权限路由列表
        routes: [],
        //用户路由数组
        routesList: []
    },
    mutations: {
        //保存路由信息
        SAVE_ROUTERS_DATA(state, data) {
            state.routes = data;
        },
        //保存当前登录用户路由权限信息
        SAVE_ROUTERS_LIST(state, data) {
            state.routesList = data;
        }
    },
    actions: {

    }
}

export default permission