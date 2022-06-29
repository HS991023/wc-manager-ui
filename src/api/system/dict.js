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


//新增字典类型信息
export function addDictTypeInfo(data) {
    return request({
        url: '/api/system/save/dict/type',
        method: 'get',
        data: data
    });
}

//更新字典类型信息
export function updateDictTypeInfo(data) {
    return request({
        url: '/api/system/update/dict/type',
        method: 'put',
        data: data
    });
}


//新增字典数据信息 
export function addDictDataInfo(data) {
    return request({
        url: '/api/system/save/dict/data',
        method: 'get',
        data: data
    });
}

//更新字典数据信息 
export function updateDictDataInfo(data) {
    return request({
        url: '/api/system/update/dict/data',
        method: 'put',
        data: data
    });
}