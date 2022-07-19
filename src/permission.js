import { getMeunTree } from '@/api/common/tree'
import store from '@/store/index'
import { flatTree } from '@/utils/array'
import { getToken } from '@/utils/auth';

//获取当前登录用户的路由数据
export function getRouters(token) {
    var promise = getMeunTree(token);
    promise.then(res => {
        //拿到当前路由数据
        let routers = res.data;
        store.commit('SAVE_ROUTERS_DATA', routers);
    })
    return promise;
}