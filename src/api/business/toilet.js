import request from '@/utils/request'


//查询公厕列表
export function listToilet(data) {
    return request({
        url: '/api/system/toilet/list',
        method: 'post',
        data: data
    });
}

//查询公厕详情
export function toiletInfo(id) {
    return request({
        url: '/api/system/toilet/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增公厕信息
export function addToilet(data) {
    return request({
        url: '/api/system/save/toilet',
        method: 'post',
        data: data
    });
}

//更新公厕信息
export function updateToilet(data) {
    return request({
        url: '/api/system/update/toilet',
        method: 'put',
        data: data
    });
}

//删除公厕(逻辑删除)
export function removeToilet(ids) {
    return request({
        url: '/api/system/remove/toilet',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}