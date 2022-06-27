import request from '@/utils/request'



//查询菜单列表
export function listRes(data) {
    return request({
        url: '/api/system/res/list',
        method: 'post',
        data: data
    })
}

//查询菜单详情
export function resInfo(id) {
    return request({
        url: '/api/system/res/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增菜单信息
export function addRes(data) {
    return request({
        url: '/api/system/save/res',
        method: 'post',
        data: data
    });
}

//更新菜单信息
export function updateRes(data) {
    return request({
        url: '/api/system/update/res',
        method: 'put',
        data: data
    });
}

//删除菜单(逻辑删除)
export function removeRes(ids) {
    return request({
        url: '/api/system/remove/res',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}