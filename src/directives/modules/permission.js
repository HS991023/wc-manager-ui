import store from '@/store/index'
import { getMeunTree } from '@/api/common/tree'



//获取当前登录用户的路由数据
export function getRouters() {
    //解决vuex动态菜单权限数据刷新后消失问题
    let token = sessionStorage.getItem('token');
    var promise = getMeunTree(token);
    promise.then(res => {
        //拿到当前路由数据
        let routers = res.data;
        store.commit('SAVE_ROUTERS_DATA', routers);
    })
    return promise;
}