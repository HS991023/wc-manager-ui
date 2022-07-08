const DictTypeKey = 'dict-type'

export function getDictType() {
    return sessionStorage.getItem(DictTypeKey);
}

export function setDictType(dictType) {
    return sessionStorage.setItem(DictTypeKey, dictType)
}

export function removeDictType() {
    return sessionStorage.clear(DictTypeKey);
}