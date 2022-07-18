import request from '@/utils/request'
import { getDictType } from '@/utils/sessionStorge';



//获取字典类型树
export function dictTree(data) {
    return request({
        url: '/api/system/dict/type/tree',
        method: 'get',
        data: data
    });
}

//查询字典类型数据列表
export function dictTypeList(data) {
    return request({
        url: '/api/system/dict/type/list',
        method: 'post',
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

//新增字典类型信息
export function addDictTypeInfo(data) {
    //转换字段
    var data = data;
    data = {
        id: data.id,
        orderNumber: data.orderNumber,
        label: data.dictName,
        type: data.dictCode,
        status: data.status,
        remark: data.remark
    }
    return request({
        url: '/api/system/save/dict/type',
        method: 'post',
        data: data
    });
}

//更新字典类型信息
export function updateDictTypeInfo(data) {
    //转换字段
    var data = data;
    data = {
        id: data.id,
        orderNumber: data.orderNumber,
        label: data.dictName,
        type: data.dictCode,
        status: data.status,
        remark: data.remark
    }
    return request({
        url: '/api/system/update/dict/type',
        method: 'put',
        data: data
    });
}


//删除字典类型信息(逻辑删除)
export function removeDictType(ids) {
    return request({
        url: '/api/system/remove/dict/type',
        method: 'delete',
        params: {
            ids: ids,
        }
    });
}


//根据字典类型查询字典数据列表
export function getDictDataByList(data) {
    return request({
        url: '/api/system/dict/data/list',
        method: 'post',
        data: data
    });
}


//根据字典类型查询字典数据
export function getDictDataByType(data) {
    return request({
        url: '/api/system/dict/data/by/type',
        method: 'post',
        data: {
            dictType: data
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

//新增字典数据信息 
export function addDictDataInfo(data) {
    //转换字段信息
    var data = {
        dictLabel: data.dictName,
        dictValue: data.dictValue,
        status: data.status,
        dictType: getDictType()
    }
    return request({
        url: '/api/system/save/dict/data',
        method: 'post',
        data: data
    });
}

//更新字典数据信息 
export function updateDictDataInfo(data) {
    //转换字段信息
    var data = {
        id: data.id,
        dictLabel: data.dictName,
        dictValue: data.dictValue,
        status: data.status,
        dictType: getDictType()
    }
    return request({
        url: '/api/system/update/dict/data',
        method: 'put',
        data: data
    });
}

//删除字典数据信息(逻辑删除)
export function removeDictData(ids) {
    return request({
        url: '/api/system/remove/dict/data',
        method: 'delete',
        params: {
            ids: ids,
        }
    });
}