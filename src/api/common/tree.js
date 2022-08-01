import request from '@/utils/request'


//获取菜单权限树
export function getMeunTree(data) {
    let res = {
        token: data
    }
    return request({
        url: '/api/system/res/tree',
        method: 'post',
        data: res
    });
}