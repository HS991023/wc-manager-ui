import request from '@/utils/request'


//查询操作日志信息列表
export function listOperatorLog(data) {
    return request({
        url: '/api/system/operator/log/list',
        method: 'post',
        data: data
    })
}