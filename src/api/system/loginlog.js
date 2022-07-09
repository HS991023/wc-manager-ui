import request from '@/utils/request'


//查询登录日志信息列表
export function loginlogList(data) {
    return request({
        url: '/api/system/login/log/list',
        method: 'post',
        data: data
    })
}