const permission = {
    state: {
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: []
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