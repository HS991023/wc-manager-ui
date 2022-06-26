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

//新增用户
export function addUser(data) {
    return request({
        url: '/api/wc/save/user',
        method: 'post',
        data: data
    });
}

//更新用户信息
export function updateUser(data) {
    return request({
        url: '/api/wc/update/user',
        method: 'put',
        data: data
    });
}

//删除用户信息,支持批量删除
export function removeUser(ids) {
    return request({
        url: '/api/wc/remove/user',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}