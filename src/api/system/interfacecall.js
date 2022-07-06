import request from '@/utils/request'


//查询接口调用数据
export function interfaceCallData(data) {
    return request({
        url: '/api/system/interface/call/data',
        method: 'post',
        data: {
            //当天日期
            currentDate: data
        }
    })
}