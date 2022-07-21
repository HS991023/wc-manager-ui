import { ArrayContains } from '@/utils/array'
import { getButtonPermission } from '@/utils/sessionStorge'
export default {
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted(el, binding, vnode) {
        //当前按钮的权限
        let btnPermissionValue = binding.value;
        //获取当前登录用户拥有的按钮权限
        let buttonPermissionList = getButtonPermission();
        //无权限则删除该按钮
        if (!ArrayContains(buttonPermissionList, btnPermissionValue)) {
            el.parentNode.removeChild(el);
        }
    }
}