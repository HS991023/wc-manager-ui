import request from '@/utils/request'


//获取菜单权限树
export function getMeunTree(token) {
    return request({
        url: '/api/system/res/tree',
        method: 'get',
        params: {
            token: token
        }
    });
}