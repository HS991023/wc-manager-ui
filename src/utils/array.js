// 获取菜单权限数组
export function getMenuPermissionList(treeData) {
    let result = []
    treeData.forEach((item) => {
        // 先克隆一份数据作为第一层级的填充
        let res = JSON.parse(JSON.stringify(item))
        delete res.children
            // if (res.type != 2) {
        result.push(res.code)
            // }
        if (item.children && item.children.length > 0) {
            // 如果当前children为数组并且长度大于0，才可进入getMenuPermissionList()方法
            result = result.concat(getMenuPermissionList(item.children))
        }
    })
    return result
}

// 获取按钮权限数组
export function getButtonPermissionList(treeData) {
    let result = []
    treeData.forEach((item) => {
        // 先克隆一份数据作为第一层级的填充
        let res = JSON.parse(JSON.stringify(item))
        delete res.children
        if (res.type === 2) {
            result.push(res.code)
        }
        if (item.children && item.children.length > 0) {
            // 如果当前children为数组并且长度大于0，才可进入getButtonPermissionList()方法
            result = result.concat(getButtonPermissionList(item.children))
        }
    })
    return result
}

//判断元素是否存在于数组中
export function ArrayContains(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            return true;
        }
    }
    return false;
};