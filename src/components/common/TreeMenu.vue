<!--
思路 :

1. 获取传递进来的数据
2. 使用 el-sub-menu 进行一个遍历 , 遍历传递过来的所有数据, 并且判断他是否有 children , 如果有children ,判断 menuType 为 1 的情况
   则使用 munuName 生成一个目录
3. 递归判断是否有多级 children , 如果有 则继续生成下一级菜单
4. 判断到最后一个层级 , 如果说 menuType ==2  情况下,name这个肯定是可以 按钮 

-->

<template>
  <div>
    <template v-for="item in treeData">
      <el-submenu :index="item.id" :key="item.id" v-if="item.children && item.children.length >= 0 && item.type === 0">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.label}}</span>
        </template>
        <TreeMenu :treeData="item.children"></TreeMenu>
      </el-submenu>
      <el-menu-item
          v-else-if="item.type === 1"
          :index="item.path"
          :key="item.id"
          @open="addMenuBreadcrumb(item)"
      >
        {{item.label}}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "TreeMenu",
  props:{
    treeData:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  methods: {
    // 每次点击左侧菜单，调用添加标签方法
    addMenuBreadcrumb (item) {
      this.$store.commit('ADDMENUTABS', item)
    }
  }
}
</script>

<style scoped>

</style>
