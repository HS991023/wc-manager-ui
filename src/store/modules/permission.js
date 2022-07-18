const permission = {
    state: {
        //用户权限路由列表
        routes: []
    },
    mutations: {
        //保存路由信息
        SAVE_ROUTERS_DATA(state, data) {
            state.routes = data;
        }
    },
    actions: {

    }
}

export default permission