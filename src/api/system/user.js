import request from '@/utils/request'

// 查询用户列表
export function listUser(data) {
    return request({
        url: '/api/wc/user/list',
        method: 'post',
        data: data
    })
}

//查询用户详情
export function userInfo(id) {
    return request({
        url: '/api/wc/user/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}