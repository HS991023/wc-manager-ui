import { getButtonPermissionList } from '@/utils/array'

export default {
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted(el, binding, vnode) {
        console.log(el, binding, vnode);
    }
}