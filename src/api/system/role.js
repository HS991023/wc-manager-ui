import request from '@/utils/request'


//查询角色下拉框数据
export function roleSelect(data) {
    return request({
        url: '/api/system/role/select',
        method: 'post',
        data: data
    })
}



//查询角色列表
export function roleList(data) {
    return request({
        url: '/api/system/role/list',
        method: 'post',
        data: data
    })
}

//查询角色详情
export function roleInfo(id) {
    return request({
        url: '/api/system/role/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增角色
export function addRole(data) {
    return request({
        url: '/api/system/save/role',
        method: 'post',
        data: data
    });
}

//更新角色信息
export function updateRole(data) {
    return request({
        url: '/api/system/update/role',
        method: 'put',
        data: data
    });
}

//删除角色(逻辑删除)
export function removeRole(ids) {
    return request({
        url: '/api/system/remove/role',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}