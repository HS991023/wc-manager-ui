import request from '@/utils/request'



//获取字典类型树
export function dictTree(data) {
    return request({
        url: '/api/system/dict/type/tree',
        method: 'get',
        data: data
    });
}