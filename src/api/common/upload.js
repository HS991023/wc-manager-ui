import request from '@/utils/request'


//上传文件
export function uploadFile(data) {
    return request({
        url: '/api/system/upload/file',
        method: 'post',
        data: data
    });
}

//根据附件ID查询数据
export function queryFileById(id) {
    return request({
        url: '/api/system/query/file',
        method: 'get',
        params: {
            id: id
        }
    });
}