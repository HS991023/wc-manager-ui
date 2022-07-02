import request from '@/utils/request'


//查询登录日志信息列表
export function listLoginlogList(data) {
    return request({
        url: '/api/system/login/log/list',
        method: 'post',
        data: data
    })
}