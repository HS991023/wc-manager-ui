<template>
<div class="container-home " style="overflow:hidden;">
  <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside id="side"  style="height: 100% background-color: rgb(238, 241, 246)">
        <!-- 动态渲染菜单栏 -->
        <el-menu router>
          <TreeMenu :tree-data="treeData"/>
        </el-menu>
  </el-aside>
  <el-container>
  <!-- 用户登录信息头像及下拉框 -->
  <el-header style="text-align: right; font-size: 12px">
    <div class="userInfo-down">
    <el-col :span="12">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="basic--circle">
        <div class="block">
        <el-avatar shape="square">
          <img src="../assets/avater.png" alt="">
        </el-avatar>
        </div>
      </div>
      </span>
      <el-dropdown-menu slot="dropdown" style="
      margin-top: -13px;
      margin-right: -20px;
      text-align: center;
      ">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
    </div>
    </el-header>
    <!-- 插入路由展示 -->
    <el-main ref="main" id="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import {MessageBox} from 'element-ui';
import {logoutUser} from '@/api/system/user'
import {getRouters} from '@/permission.js'
import TreeMenu from "@/components/common/TreeMenu.vue"; //动态菜单组件
export default {
    name:'Home',
    data() {
      return {
        //默认侧边栏展开
        isCollapse: false,
        //只保持一个菜单打开
        opened: true,
        openIndex:[],
        dynamicTags: [{
            routerName:'展示页面',
            routerPath: '/show'
        }],
      }
    },
    components:{TreeMenu},
    methods:{
      //退出登录
      logout(){
        logoutUser().then(response =>{
           MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              location.href = '/login';
            }).catch(() => {
              
            });
        })
      }
    },
   computed:{
		   treeData:function() {  
          //通过方法访问
         return this.$store.getters.permission_routes; 
      }
	 },
   created(){
    //解决vuex动态菜单权限数据刷新后消失问题
    let token = sessionStorage.getItem('token');
    getRouters(token);
  }
}
</script>

<style scoped>

.banner{
  width: 120px;
  height: 30px;
  margin-left: -100px;
}
.container-home{
    width: 100%;
    height: 100vh;
}
.el-menu {
  height: 100%;
}
.el-header {
    position:absolute; 
    color: #333;
    line-height: 60px;
    right: 0px;
}
.title-message{
  float: left;
  font-size: 26px;
}
.el-card__body, .el-main {
    padding: 10px;
}
.el-menu-item a{
  text-decoration: none;
  color: black;
}
.userInfo-down{
  float: right;
  margin-left: 20px;
}
.user-info{
  font-size: 15px;
}
</style>

