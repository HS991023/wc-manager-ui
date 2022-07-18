<template>
   <router-view></router-view>
</template>

<script>
import {getRouters} from '@/api/system/permission.js'
export default {
  name: 'App',
  created(){
    //解决vuex动态菜单权限数据刷新后消失问题
    let token = sessionStorage.getItem('token');
    getRouters(token);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
}
@import url('../src/assets/css/global.css')
</style>
