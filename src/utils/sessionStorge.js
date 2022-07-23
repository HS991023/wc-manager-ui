//字典类型
const DictTypeKey = 'dict-type'

//按钮权限
const ButtonPermi = "button-permission"

//当前登录用户信息
const CurrnetLoginUserInfo = "currnet-loginuser-info"

export function getDictType() {
    return sessionStorage.getItem(DictTypeKey);
}

export function setDictType(dictType) {
    return sessionStorage.setItem(DictTypeKey, dictType)
}

export function removeDictType() {
    return sessionStorage.clear(DictTypeKey);
}

//按钮权限
export function getButtonPermission() {
    return JSON.parse(sessionStorage.getItem(ButtonPermi));
}

export function setButtonPermission(data) {
    return sessionStorage.setItem(ButtonPermi, JSON.stringify(data))
}

export function removeButtonPermission() {
    return sessionStorage.clear(ButtonPermi);
}

//当前登录用户信息
export function getCurrnetLoginUserInfo() {
    return JSON.parse(sessionStorage.getItem(CurrnetLoginUserInfo));
}

export function setCurrnetLoginUserInfo(data) {
    return sessionStorage.setItem(CurrnetLoginUserInfo, JSON.stringify(data))
}

export function removeCurrnetLoginUserInfo() {
    return sessionStorage.clear(CurrnetLoginUserInfo);
}