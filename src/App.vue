<template>
   <Login/>
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
    Login
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
  background-color: #F2F6FC;
}
</style>
