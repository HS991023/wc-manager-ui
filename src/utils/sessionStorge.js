//字典类型
const DictTypeKey = 'dict-type'

//按钮权限
const ButtonPermi = "button-permission"

export function getDictType() {
    return sessionStorage.getItem(DictTypeKey);
}

export function setDictType(dictType) {
    return sessionStorage.setItem(DictTypeKey, dictType)
}

export function removeDictType() {
    return sessionStorage.clear(DictTypeKey);
}

export function getButtonPermission() {
    return JSON.parse(sessionStorage.getItem(ButtonPermi));
}

export function setButtonPermission(data) {
    return sessionStorage.setItem(ButtonPermi, JSON.stringify(data))
}

export function removeButtonPermission() {
    return sessionStorage.clear(ButtonPermi);
}