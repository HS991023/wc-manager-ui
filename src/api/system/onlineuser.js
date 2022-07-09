import request from '@/utils/request'


//查询在线用户信息列表
export function onLineUserList(data) {
    return request({
        url: '/api/system/online/user/list',
        method: 'post',
        data: data
    })
}


//强制提出用户
export function kickOutUser(params) {
    return request({
        url: '/api/system/force/logout',
        method: 'get',
        params: {
            sessionId: params
        }
    })
}