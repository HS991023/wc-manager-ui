import request from '@/utils/request'


//查询在线用户信息列表
export function listOnLineUser(data) {
    return request({
        url: '/api/system/online/user/list',
        method: 'post',
        data: data
    })
}