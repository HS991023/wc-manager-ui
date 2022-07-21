import store from '@/store/index'
import { getToken } from '@/utils/auth'
import { getMeunTree } from '@/api/common/tree'
import { setButtonPermission } from '@/utils/sessionStorge'
import { getButtonPermissionList } from '@/utils/array'

//获取当前登录用户的路由数据
export function getRouters() {
    //解决vuex动态菜单权限数据刷新后消失问题
    var promise = getMeunTree(getToken());
    promise.then(res => {
        //拿到当前路由数据
        let routers = res.data;
        //保存至vuex中(用于home页面共享菜单权限数据)
        store.commit('SAVE_ROUTERS_DATA', routers);

        //实时更新一份按钮权限在SessionStorge中
        let buttonPermiList = getButtonPermissionList(routers);
        setButtonPermission(buttonPermiList)
    })
    return promise;
}