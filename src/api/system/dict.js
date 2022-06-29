import request from '@/utils/request'



//获取字典类型树
export function dictTree(data) {
    return request({
        url: '/api/system/dict/type/tree',
        method: 'get',
        data: data
    });
}


//查询字典顶级节点下属字典数据
export function getDictTypeTopData(data) {
    return request({
        url: '/api/system/dict/type/top/data/list',
        method: 'post',
        data: data
    });
}

//根据字典类型查询字典数据列表
export function getDictDataByType(data) {
    return request({
        url: '/api/system/dict/data/list',
        method: 'post',
        data: data
    });
}

//查看字典类型信息详情
export function getDictTypeInfo(id) {
    return request({
        url: '/api/system/dict/type/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//查看字典数据信息详情
export function getDictDataInfo(id) {
    return request({
        url: '/api/system/dict/data/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}