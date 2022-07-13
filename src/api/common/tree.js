import request from '@/utils/request'


//获取菜单权限树
export function getMeunTree() {
    return request({
        url: '/api/system/res/tree',
        method: 'get',
        params: {

        }
    });
}