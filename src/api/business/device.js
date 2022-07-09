import request from '@/utils/request'


//查询设备列表
export function deviceList(data) {
    return request({
        url: '/api/system/device/list',
        method: 'post',
        data: data
    });
}

//查询设备详情
export function deviceInfo(id) {
    return request({
        url: '/api/system/device/detail',
        method: 'get',
        params: {
            id: id
        }
    });
}

//新增设备信息
export function addDevice(data) {
    return request({
        url: '/api/system/save/device',
        method: 'post',
        data: data
    });
}

//更新设备信息
export function updateDevice(data) {
    return request({
        url: '/api/system/update/device',
        method: 'put',
        data: data
    });
}

//删除设备(逻辑删除)
export function removeDevice(ids) {
    return request({
        url: '/api/system/remove/device',
        method: 'delete',
        params: {
            ids: ids
        }
    });
}