import request from '@/utils/request'


//查询坑位列表
export function listPosition(data) {
    return request({
        url: '/api/system/position/list',
        method: 'post',
        data: data
    });
}

//查询坑位详情
export function positionInfo(id) {
    return request({
        url: '/api/system/position/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增坑位信息
export function addPosition(data) {
    return request({
        url: '/api/system/save/position',
        method: 'post',
        data: data
    });
}

//更新坑位信息
export function updatePosition(data) {
    return request({
        url: '/api/system/update/position',
        method: 'put',
        data: data
    });
}

//删除坑位(逻辑删除)
export function removePosition(ids) {
    return request({
        url: '/api/system/remove/position',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}