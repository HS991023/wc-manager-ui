const getters = {
    permission_routes: state => state.permission.routes,
    permission_routes_list: state => state.permission.routesList,
    menuTabs: state => state.tab.menuTabs,
    menuTabsValue: state => state.tab.menuTabsValue
}
export default getters