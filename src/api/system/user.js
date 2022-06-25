import request from '@/utils/request'



// 查询用户列表
export function listUser(data) {
    return request({
        url: '/api/wc/user/list',
        method: 'post',
        data: data
    })
}