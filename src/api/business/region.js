import request from '@/utils/request'


//查询地区列表
export function regionList(data) {
    return request({
        url: '/api/system/region/list',
        method: 'post',
        data: data
    });
}

//查询地区详情
export function regionInfo(id) {
    return request({
        url: '/api/system/region/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增地区信息
export function addRegion(data) {
    return request({
        url: '/api/system/save/region',
        method: 'post',
        data: data
    });
}

//更新地区信息
export function updateRegion(data) {
    return request({
        url: '/api/system/update/region',
        method: 'put',
        data: data
    });
}

//删除地区(逻辑删除)
export function removeRegion(ids) {
    return request({
        url: '/api/system/remove/region',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}