<template>
   <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #fcfcfc;
}
@import url('../src/assets/css/global.css')
</style>
