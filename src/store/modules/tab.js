const tab = {
    state: {
        menuTabsValue: '', // 激活的标签栏导航
        menuTabs: [], // 标签栏导航
    },
    mutations: {
        // 更新选中的导航
        UPADTEMENUTABS(state, payload) {
            state.menuTabsValue = payload
        },

        // 新增标签导航
        ADDMENUTABS(state, payload) {
            state.menuTabsValue = payload.path;
            // 判断当前的标签中是否存在待添加项，避免重复添加
            const haveFlag = state.menuTabs.some(item => {
                return item.id == payload.id
            })
            if (!haveFlag) {
                state.menuTabs.push(payload)
            }
        },

        // 删除标签导航
        DELETEMENUTABS(state, payload) {
            state.menuTabs = state.menuTabs.filter((item, index) => {
                return item.path != payload
            })
        }
    },
}

export default tab