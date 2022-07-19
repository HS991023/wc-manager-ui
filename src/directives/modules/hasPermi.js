import { getToken } from '@/utils/auth'
import { getRouters } from '@/directives/modules/permission'
import { getButtonPermissionList, ArrayContains } from '@/utils/array'

export default {
    // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted(el, binding, vnode) {
        //当前按钮的权限
        let btnPermissionValue = binding.value;
        //获取当前登录用户的可路由菜单权限,防止浏览器输入框跳转
        getRouters(getToken()).then(res => {
            //拿到当前路由数据
            let routers = res.data;
            //当前用户拥有的按钮权限数组
            let buttonPermissionList = getButtonPermissionList(routers);

            //无权限则删除该按钮
            if (!ArrayContains(buttonPermissionList, btnPermissionValue)) {
                el.parentNode.removeChild(el);
            }

        });
    }
}