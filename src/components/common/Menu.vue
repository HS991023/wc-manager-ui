<template>
  <div class="menuContent">
    <template v-for="list in menuList">
      <el-submenu v-if="list.children != undefined && list.children.length > 0 && list.show == true" :key="list.title" :index="list.path">
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          {{ list.title}}
        </template>
        <Menu v-if="list.children != undefined && list.children.length > 0 && list.show == true" :menuList="list.children"></Menu>
      </el-submenu>
      <el-menu-item v-if="(list.children == undefined || list.children.length == 0) && list.show == true" :index="list.path" :key="list.title">
        {{list.title}}
      </el-menu-item>
    </template>
  </div>
</template>
 
<script>
export default {
  name: 'Menu',
  props: ['menuList'],
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>

